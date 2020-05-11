import Handlebars from "handlebars";
import { knownHelpers } from '../handlebars-helpers';
import FrontmatterExtractor from './frontmatter-extractor';
import rawBody from "raw-body";

export const handlebarsCompileOptions = {
  knownHelpersOnly: true,
  knownHelpers: knownHelpers,
  preventIndent: true
};

export async function compileHandlebars(
  source: NodeJS.ReadableStream
) {
  const frontmatterExtractor = new FrontmatterExtractor();
  source.pipe(frontmatterExtractor);

  const str = await rawBody(frontmatterExtractor, {encoding: "utf-8"});

  const compiled = Handlebars.precompile(
    str,
    handlebarsCompileOptions
  ) as string;

  return {
    compiled,
    frontmatter: await frontmatterExtractor.parsedFrontmatter()
  }
}
