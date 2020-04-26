import { CMSConnectionForRender } from "./cms";
import { BundleRetrieval } from "./common/bundle";
import { HTTPError } from "./error-pages";
import { rendererMap } from "./renderers";


export interface RenderedResult {
  rendered: NodeJS.ReadableStream | string;
  httpContentType: string;

  /** Treat as 200 if not present. */
  httpStatus?: number;
}

export default async function render(
  path: string,
  bundle: BundleRetrieval,
  cms: CMSConnectionForRender
): Promise<RenderedResult> {
  try {
    // static files
    const sep = (path.startsWith("/") ? "" : "/") // exactly one slash between public and path.
    const file = await bundle.retrieveFile("public" + sep + path);
    if (typeof file !== "undefined")
      return {
        rendered: file.stream,
        httpContentType: file.metadata.contentType,
      };

    const { templateUid, renderContext, renderData } = await cms.contentForPath(
      path
    );
    const template = await bundle.retrieveFile(templateUid);
    if (typeof template === "undefined")
      throw new HTTPError.NotFound("Template does not exist, template: " + templateUid);

    const renderer = rendererMap[template.metadata.contentType];
    if (typeof renderer === "undefined")
      throw new HTTPError.NotFound(
        "Renderer for template does not exist, template: " + templateUid
      );

    

    return renderer(template, renderData, renderContext, bundle);
  } catch (e) {
    if (e instanceof HTTPError) {
      const customErrorPage = await bundle.retrieveFile(`${e.statusCode}.html`);
      const errorPage = customErrorPage?.stream || e.defaultErrorPageHTML;

      return {
        rendered: errorPage,
        httpContentType: "text/html",
        httpStatus: e.statusCode,
      };
    }
    throw e;
  }
}
