import { PassThrough } from "readable-stream";
import { AbstractRenderer } from "./abstract";
import getRawBody from "raw-body";
import Handlebars from "handlebars";
import getHelpers from "../handlebars-helpers";

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

  const [templateSrc, storedPartials] = await Promise.all([
    getRawBody(file.stream as any, { encoding: true }),
    bundle.retrievePartials(),
  ]);

  const template = parseCompiledTemplate(templateSrc);
  const partials = parsePartials(storedPartials);

  const rendered = template(renderData, {
    helpers: getHelpers({
      renderContext: context,
      compilerMetadata: file.metadata.compilerMetadata,
    }),
    partials: partials,
  });

  stream.end(rendered);

  return {
    rendered: stream,
    httpContentType: "text/html",
  };
};

export default handlebarsRenderer;
