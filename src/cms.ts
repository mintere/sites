import { RenderContext } from "./common/context";

export interface RenderData {
  title: string,
  uid: string,
  metaDescription: string,
  settings: any,
  blocks: any
}

interface CMSContent {
  templateUid: string;
  renderData: RenderData;
  renderContext: RenderContext;
}

export interface CMSConnectionForRender {
  contentForPath(
    path: string
  ): Promise<CMSContent>;
}
