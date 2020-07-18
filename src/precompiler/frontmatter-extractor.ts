import { Transform, Readable } from "readable-stream";
import json5 from "json5";

import {EOL} from "os";

export default class FrontmatterExtractor extends Transform {
  state: "fileStart" | "inFrontmatter" | "inBody" = "fileStart";

  frontmatterExtracted = false;

  extractedFrontmatter: Promise<string | undefined>;

  constructor() {
    super();

    this.extractedFrontmatter = new Promise((res, rej) => {
      this.on("frontmatterReady", (hasFrontmatter) => {
        if(hasFrontmatter) {
          res(Buffer.concat(this.rawFrontmatter).toString());
        } else {
          res();
        }
      })

      this.on("error", (e) => {
        rej(e);
      });
    });

    this.on("prefinish", () => {
      if(this.state != "inBody")
        this.destroy(new Error("Front-matter did not end."))
    })
  }

  static async extract(source: Readable): Promise<[Readable, any]> {
    const extractor = new FrontmatterExtractor();
    return [source.pipe(extractor), await extractor.parsedFrontmatter()]
  }
  
  async parsedFrontmatter(): Promise<any> {
    const frontmatterStr = await this.extractedFrontmatter;
    if(frontmatterStr) return json5.parse(frontmatterStr);
  }

  rawFrontmatter: Buffer[] = [];

  openDelimCharsSeen = 0;
  openDelimChars = Buffer.from("---" + EOL);
  openDelimCharsLen = this.openDelimChars.length;

  closeDelimCharsSeen = 0;
  closeDelimChars = Buffer.from(EOL + "---" + EOL);
  closeDelimCharsLen = this.closeDelimChars.length;

  _transform(chunk: Buffer, _enc: string, done: (error?: any, data?: any) => void) {
    if (this.state === "inBody") return done(null, chunk);

    if (this.state === "fileStart") {
      let headerCharsInChunk = 0;
    
      for (let i = 0; i < chunk.length; i++) {
        const char = chunk[i];
        const expectedHeaderChar = this.openDelimChars[this.openDelimCharsSeen];

        if (char == expectedHeaderChar) {
          headerCharsInChunk++;
          this.openDelimCharsSeen++;
          if (this.openDelimCharsSeen === this.openDelimCharsLen) {
            this.state = "inFrontmatter";
            chunk = chunk.slice(headerCharsInChunk);
            break;
          }
        } else {
          this.state = "inBody";

          this.emit("frontmatterReady", false);

          const lookback = this.openDelimCharsSeen - headerCharsInChunk;
          if (lookback > 0) this.push(this.openDelimChars.slice(0, lookback));

          return done(null, chunk);
        }
      }
    }

    if (this.state === "fileStart") return done();

    let lastWriteTo = 0;

    for (let i = 0; i < chunk.length; i++) {
      const char = chunk[i];

      const expectedCloseChar = this.closeDelimChars[
        this.closeDelimCharsSeen
      ];

      if (char === expectedCloseChar) {
        this.closeDelimCharsSeen++;

        if (this.closeDelimCharsSeen === this.closeDelimCharsLen) {
          this.state = "inBody";

          this.emit("frontmatterReady", true);

          return done(null, chunk.slice(i + 1));
        } else if (this.closeDelimCharsSeen === 1 && i !== 0) {
          this.rawFrontmatter.push(chunk.slice(lastWriteTo, i));
          lastWriteTo = i;
        }
      } else if (this.closeDelimCharsSeen !== 0) {
        // we ignored things that looked like the start of a close, so we need to push them again now that we know it is not a close deliminter
        this.rawFrontmatter.push(
          this.closeDelimChars.slice(0, this.closeDelimCharsSeen)
        );
        lastWriteTo = i - 1;

        this.closeDelimCharsSeen = 0;
      }
    }

    if (this.closeDelimCharsSeen === 0 && this.state === "inFrontmatter") {
      this.rawFrontmatter.push(chunk.slice(lastWriteTo))
    }

    done(null)
  }
}
