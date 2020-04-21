import { HandlebarsHelperGlobalContext } from "./abstract";
import MintereFormsHead from "./mintereFormsHead";
import MintereForm from "./mintereForm";

export type HandlebarsHelpers =
  "mintereFormsHead" | "mintereForm" | "eq";

export const knownHelpers: {
  [k in HandlebarsHelpers]: true;
} = {
  mintereFormsHead: true,
  mintereForm: true,
  eq: true
};

export default function getHelpers(
  options: HandlebarsHelperGlobalContext
): {
  [k in HandlebarsHelpers]: Handlebars.HelperDelegate;
} {
  return {
    mintereFormsHead: new MintereFormsHead(options).handlebarsDelegate,
    mintereForm: new MintereForm(options).handlebarsDelegate,
    eq(a, b, c) {
      if(typeof c == "undefined") return false;

      const allowedEqualityChecks = ["string", "number"];

      return (
        allowedEqualityChecks.includes(typeof a) &&
        allowedEqualityChecks.includes(typeof b) &&
        a === b
      );
    }
  };
}