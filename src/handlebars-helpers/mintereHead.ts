import Handlebars from "handlebars";
import { HandlebarsHelper } from "./abstract";

export default class MintereHead extends HandlebarsHelper {
  helper() {
    const {recaptchaV3PublicKey, formSubmissionUrl, cdnHostname, siteId} = this.globalCtx.renderContext;

    return new Handlebars.SafeString(`
<link rel="preconnect" href="${Handlebars.Utils.escapeExpression(cdnHostname)}"/>
<script src="/_mintere/m.js" async></script>
<script type="text/javascript">
if(typeof w.mintereQ==="undefined")(function(w){var q=w.mintereQ=${JSON.stringify([
  ["config", {formSubmissionUrl, recaptchaV3PublicKey, siteId}],
])};w.mintere=function(){q.push(arguments);}})(window);
mintere("page");
</script>
`)
  }
}
