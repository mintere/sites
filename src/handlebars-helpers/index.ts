import Handlebars from "handlebars";
import { HandlebarsHelperGlobalContext } from "./abstract";
import MintereFormsHead from "./mintereFormsHead";
import MintereForm from "./mintereForm";
import RenderMarkdown from "./renderMarkdown";
import RenderBlock from './renderBlock';

export type HandlebarsHelpers =
  "mintereFormsHead" | "mintereForm" | "eq" | "renderRichText" | "renderMarkdown" | "renderBlock";

export const knownHelpers: {
  [k in HandlebarsHelpers]: true;
} = {
  mintereFormsHead: true,
  mintereForm: true,
  eq: true,
  renderRichText: true,
  renderMarkdown: true,
  renderBlock: true
};


const allowedEqualityChecks: {
  [k in string]?: true
} = {
  "string": true,
  "number": true
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
    renderBlock: new RenderBlock(options).handlebarsDelegate,
    eq(a: any, b: any, c: any) {
      if(typeof c == "undefined") return false;
      return (
        allowedEqualityChecks[typeof a] &&
        allowedEqualityChecks[typeof b] &&
        a === b
      );
    }
  };
}