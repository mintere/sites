import { AbstractCompiler } from "./abstract";
import { knownHelpers } from '../../handlebars-helpers';

const partialNamePattern = /^partials\/(.+)\.(?:hbs|handlebars)$/i;

export const handlebarsCompileOptions = {
  knownHelpersOnly: true,
  knownHelpers: knownHelpers,
  preventIndent: true
};

const compileHandlebars: AbstractCompiler = async function compileHandlebars(
  uid: string,
  source: string
) {
  const precompiled = Handlebars.precompile(
    source,
    handlebarsCompileOptions
  ) as string;
  const partialNameMatch = uid.match(partialNamePattern);

  return partialNameMatch
    ? {
        handlebarsPartials: {
          [partialNameMatch[1]]: precompiled,
        },
      }
    : {
        file: {
          compiled: precompiled,
        }
      };
};

export default compileHandlebars;
