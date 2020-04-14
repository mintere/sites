import Handlebars from "handlebars";
import { HandlebarsHelper } from "./abstract";

export default class MintereFormsHead extends HandlebarsHelper {
  helper() {
    if(this.globalCtx.mintereFormsHeadRendered) 
      throw new Error("mintere forms head rendered multiple times");
    
    this.globalCtx.mintereFormsHeadRendered = true;

    const {recaptchaV3PublicKey} = this.globalCtx.deployment;

    const urlEncoded = Handlebars.escapeExpression(encodeURIComponent(recaptchaV3PublicKey));
    
    return new Handlebars.SafeString(`
<script src="/_mintere/forms.js" id="mintere-forms-code"
        data-recaptcha-key="${urlEncoded}" data-form-submission-url="${this.globalCtx.deployment.formSubmissionUrl}" ></script>`
    )

    
  }
}
