import { FileType } from "../common/file-types";
import { AbstractRenderer } from "./abstract";
import handlebarsRenderer from "./handlebars";

export const rendererMap: {
  [t in FileType]?: AbstractRenderer;
} = {
  [FileType.handlebars]: handlebarsRenderer
};