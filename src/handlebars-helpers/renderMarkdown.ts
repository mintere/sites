import Handlebars from "handlebars";
import { HandlebarsHelper } from "./abstract";
import markdownIt from "markdown-it";

const safeMd = markdownIt({
  typographer: true
})

const md = markdownIt({
  html: true
})

export default class RenderMarkdown extends HandlebarsHelper {
  helper(_: never, [markdown, safe]: any[]) {
    if (typeof markdown !== "string")
      markdown = "";

    if (safe !== false)
      return md.render(markdown);
    else 
      return new Handlebars.SafeString(safeMd.render(markdown));

  }
}
