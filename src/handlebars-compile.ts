import knownHelpers from "./known-handlebars-helpers";

export const handlebarsCompileOptions = {
  knownHelpersOnly: true,
  knownHelpers: knownHelpers,
  preventIndent: true
};

export function compileTemplate(source: string) {
  return Handlebars.precompile(
    source,
    handlebarsCompileOptions
  ) as string
}

export function precompileTemplate(source: string) {
  return Handlebars.precompile(
    source,
    handlebarsCompileOptions
  ) as string
}

export default handlebarsCompileOptions;