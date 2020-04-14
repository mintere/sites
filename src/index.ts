import Handlebars from "handlebars";
import getHelpers from "./handlebars-helpers";
import { ThemeManifest } from "./api-data";
import { DeploymentData } from "./api-data";

export { knownHelpers } from "./known-handlebars-helpers";

export function hydrateTemplate(template: any) {
  return Handlebars.template(template)
}

export function hydratePartials(partials: {
  [k: string]: any
}, transformer: (_: any) => any = (a) => a) {
  return Object.keys(partials).reduce((obj, partialName) => {
    return {
      ...obj,
      [partialName]: hydrateTemplate(transformer(partials[partialName]))
    };
  }, {});
}

export interface PartialsMap  {
  [k: string]: Handlebars.TemplateDelegate;
}

export function renderHandlebars(
  template: Handlebars.TemplateDelegate,
  partials: PartialsMap,
  {renderData, themeManifest, deployment}: {
    renderData: any,
    themeManifest: ThemeManifest,
    deployment: DeploymentData
  }
): string {
  return template(renderData, {
    helpers: getHelpers({
      themeManifest,
      deployment
    }),
    partials: partials
  });
}