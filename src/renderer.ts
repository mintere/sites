import Handlebars from "handlebars";
import getHelpers from "./handlebars-helpers";
import { RenderData, RenderContext } from './cms';
import { BundleRetrieval } from './bundle';

export interface PartialsMap {
  [k: string]: Handlebars.TemplateDelegate;
}

type BlocksMap = Record<string, Handlebars.TemplateDelegate>;

async function getBlocks(renderData: RenderData, retrieveBlock: BundleRetrieval["retrieveBlock"]): Promise<BlocksMap> {
  if(typeof renderData.blocks === "undefined" || !Array.isArray(renderData.blocks)) return {};
  
  let blocks: BlocksMap = {};
  let findingBlocks = new Set<string>();

  for (const block of renderData.blocks) {
    if(typeof block !== "object") continue;
    const {type} = block;

    if(typeof type !== "string") continue;
    if(findingBlocks.has(type)) continue;

    findingBlocks.add(type);

    blocks[type] = await retrieveBlock(block.type);
  }

  return blocks;
}

export async function renderHandlebars(
  templatePromise: Promise<Handlebars.TemplateDelegate>,
  partialsPromise: Promise<PartialsMap>,
  renderData: RenderData,
  context: RenderContext,
  bundle: BundleRetrieval
) {
  const [partials, blocks] = await Promise.all([partialsPromise, getBlocks(renderData, bundle.retrieveBlock)]);
  
  function renderTemplate(template: Handlebars.TemplateDelegate, data: any): string {
    return template(data, {
      helpers: getHelpers({
        renderContext: context,
        blocks,
        renderTemplate,
        bundle
      }),
      partials,
    });
  }

  return renderTemplate(await templatePromise, renderData);
};