import Handlebars from "handlebars";
import { HandlebarsHelper } from "./abstract";

export default class MintereForm extends HandlebarsHelper {
  helper(_: never, [formUid, htmlAttrs]: any[], content: () => string | undefined) {
    if(!this.globalCtx.mintereFormsHeadRendered) 
      throw new Error("mintere forms head needs to be rendered before rendering a form");

    if (typeof formUid != "string")
      throw new Error("tried to render a mintere form without a uid");
    
    if (typeof htmlAttrs != "string")
      htmlAttrs = "";

    return new Handlebars.SafeString(`
<form data-mintere-form="${Handlebars.escapeExpression(formUid)}" ${htmlAttrs}>
  ${content ? content() : ""}
</form>
`)
  }
}
