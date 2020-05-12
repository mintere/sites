import Handlebars from "handlebars";
import { HandlebarsHelper } from "./abstract";

export default class MintereFormsHead extends HandlebarsHelper {
  helper() {
    if(this.globalCtx.mintereFormsHeadRendered) 
      throw new Error("mintere forms head rendered multiple times");
    
    this.globalCtx.mintereFormsHeadRendered = true;

    const {recaptchaV3PublicKey, formSubmissionUrl} = this.globalCtx.renderContext;

    const urlEncoded = Handlebars.escapeExpression(encodeURIComponent(recaptchaV3PublicKey));
    
    return new Handlebars.SafeString(`
<script src="${this.globalCtx.bundle.formsScriptSource()}" id="mintere-forms-code"
        data-recaptcha-key="${urlEncoded}" data-form-submission-url="${formSubmissionUrl}" ></script>`
    )

    
  }
}
