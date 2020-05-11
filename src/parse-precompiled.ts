import Handlebars from "handlebars";

export function parseCompiledTemplate(source: any) {
  return Handlebars.template((new Function("return " + source)()));
}

export function parsePartials(
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
