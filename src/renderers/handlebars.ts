import { PassThrough } from "readable-stream";
import { AbstractRenderer } from "./abstract";
import getRawBody from "raw-body";
import Handlebars from "handlebars";
import getHelpers from "../handlebars-helpers";
import { HandlebarsHelper } from '../handlebars-helpers/abstract';

function parseCompiledTemplate(source: any) {
  return Handlebars.template((new Function("return " + source)()));
}

function parsePartials(
  partials: {
    [k: string]: any;
  }
) {
  return Object.keys(partials).reduce((obj, partialName) => {
    return {
      ...obj,
      [partialName]: parseCompiledTemplate(partials[partialName]),
    };
  }, {});
}

interface PartialsMap {
  [k: string]: Handlebars.TemplateDelegate;
}

const handlebarsRenderer: AbstractRenderer = async function handlebarsRenderer(
  file,
  renderData,
  context,
  bundle
) {
  const stream = new PassThrough();

  const [partials, templateSrc, blocks] = await Promise.all([
    bundle.retrievePartials().then((p) => parsePartials(p)),
    getRawBody(file.stream as any, { encoding: true }),
    (async function getBlocks() {
      if(typeof renderData.blocks === "undefined" || !Array.isArray(renderData.blocks)) return {};
      
      let blocks: Record<string, Handlebars.TemplateDelegate> = {};
      let findingBlocks = new Set<string>();

      for (const block of renderData.blocks) {
        if(typeof block !== "object") continue;
        const {type} = block;

        if(typeof type !== "string") continue;
        if(findingBlocks.has(type)) continue;

        findingBlocks.add(type);

        const file = await bundle.retrieveFile("blocks/" + block.type + ".hbs");
        if(typeof file === "undefined")
          throw new Error("References unknown block.");

        const src = await getRawBody(file.stream as any, { encoding: true });
        
        blocks[type] = parseCompiledTemplate(src);
      }

      return blocks;
    })()
  ]);

  const template = parseCompiledTemplate(templateSrc);

  function renderTemplate(template: Handlebars.TemplateDelegate, data: any) {
    return template(data, {
      helpers: getHelpers({
        renderContext: context,
        compilerMetadata: file.metadata.compilerMetadata,
        blocks,
        renderTemplate
      }),
      partials,
    });
  }

  stream.end(renderTemplate(template, renderData));

  return {
    rendered: stream,
    httpContentType: "text/html",
  };
};

export default handlebarsRenderer;
