import Handlebars from "handlebars";
import { HandlebarsHelper } from "./abstract";

export default class RenderBlock extends HandlebarsHelper {
  helper(_: never, [block]: any[]) {
    if (typeof block !== "object")
      return;
    
    const {type} = block;
    
    if (typeof type !== "string")
      return;

    const blockTemplate = this.globalCtx.blocks[type];

    if (typeof blockTemplate === "undefined")
      return "UNKNOWN BLOCK " + type;
    
    return new Handlebars.SafeString(
      this.globalCtx.renderTemplate(blockTemplate, block)
    )
  }
}
