import { HandlebarsHelper } from "./abstract";

export class AssetUrl extends HandlebarsHelper {
  helper(_: never, [assetName, options]: any[]) {
    if (typeof assetName !== "string")
      return "";

    if (typeof options !== "object")
      options = {};

    return this.globalCtx.bundle.assetUrl(assetName, options)
  }
}
