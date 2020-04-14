import { HandlebarsHelper, HandlebarsHelperContext } from "./abstract";

export default class StaticFilePathHelper extends HandlebarsHelper {
  helper(ctx: HandlebarsHelperContext, [fileName]: any[]) {
    if (typeof fileName != "string") return;

    const fileInfo = this.globalCtx.themeManifest.files[fileName];
    if (typeof fileInfo == "undefined") return;
    if (typeof fileInfo.static == "undefined") return;

    return "https://assets.mintere.site/" + fileInfo.static;
  }
}
