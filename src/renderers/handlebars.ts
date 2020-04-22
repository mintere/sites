import { PassThrough } from "readable-stream";
import { AbstractRenderer } from "./abstract";
import getRawBody from "raw-body";
import Handlebars from "handlebars";
import getHelpers from "../handlebars-helpers";

function hydrateTemplate(template: any) {
  return Handlebars.template(template);
}

function hydratePartials(
  partials: {
    [k: string]: any;
  },
  transformer: (_: any) => any = (a) => a
) {
  return Object.keys(partials).reduce((obj, partialName) => {
    return {
      ...obj,
      [partialName]: hydrateTemplate(transformer(partials[partialName])),
    };
  }, {});
}

interface PartialsMap {
  [k: string]: Handlebars.TemplateDelegate;
}

function parseCompiledTemplate(source: string) {
  const templateSpec = new Function(
    "return " + source
  );
  return hydrateTemplate(templateSpec);
}

function parsePartials(partialsJSON: string): PartialsMap {
  const partialsData = JSON.parse(partialsJSON);

  return hydratePartials(partialsData, (src) => parseCompiledTemplate(src));
}

const handlebarsRenderer: AbstractRenderer = async function handlebarsRenderer(
  file,
  renderData,
  context,
  bundle
) {
  const stream = new PassThrough();

  const [templateSrc, partialsDownload] = await Promise.all([
    getRawBody(file.stream as any, { encoding: true }),
    bundle.retrievePartials(),
  ]);

  const template = parseCompiledTemplate(templateSrc);
  const partials = parsePartials(partialsDownload.toString());

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
