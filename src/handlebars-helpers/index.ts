import { HandlebarsHelpers } from "../known-handlebars-helpers";
import { HandlebarsHelperGlobalContext } from "./abstract";
import StaticFilePathHelper from "./staticFilePath";
import MintereFormsHead from "./mintereFormsHead";
import MintereForm from "./mintereForm";

export default function getHelpers(
  options: HandlebarsHelperGlobalContext
): {
  [k in HandlebarsHelpers]: Handlebars.HelperDelegate;
} {
  return {
    staticFilePath: new StaticFilePathHelper(options).handlebarsDelegate,
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
