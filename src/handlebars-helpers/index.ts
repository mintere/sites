import Handlebars from "handlebars";
import { HandlebarsHelperGlobalContext } from "./abstract";
import MintereFormsHead from "./mintereFormsHead";
import MintereForm from "./mintereForm";
import RenderMarkdown from "./renderMarkdown";

export type HandlebarsHelpers =
  "mintereFormsHead" | "mintereForm" | "eq" | "renderRichText" | "renderMarkdown";

export const knownHelpers: {
  [k in HandlebarsHelpers]: true;
} = {
  mintereFormsHead: true,
  mintereForm: true,
  eq: true,
  renderRichText: true,
  renderMarkdown: true
};

export default function getHelpers(
  options: HandlebarsHelperGlobalContext
): {
  [k in HandlebarsHelpers]: Handlebars.HelperDelegate;
} {
  return {
    mintereFormsHead: new MintereFormsHead(options).handlebarsDelegate,
    mintereForm: new MintereForm(options).handlebarsDelegate,
    renderRichText: new RenderMarkdown(options).handlebarsDelegate,
    renderMarkdown: new RenderMarkdown(options).handlebarsDelegate,
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