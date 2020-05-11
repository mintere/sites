import Handlebars from "handlebars";

export interface AssetUrlOptions {
  width?: string
  height?: string
  aspectRatio?: string
  quality?: string
  blur?: string
  crop?: string
  cropGravity?: "center"|"east"|"north"|"south"|"west"|"northeast"|"northwest"|"southeast"|"southwest"
}


export interface BundleRetrieval {
  retrieveBlock(name: string): Promise<Handlebars.TemplateDelegate>

  assetUrl(assetName: string, options: AssetUrlOptions): string
}