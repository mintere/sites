import { RenderContext } from "./common/context";

interface CMSContent {
  templateUid: string;
  renderData: any;
  renderContext: RenderContext;
}

export interface CMSConnectionForRender {
  contentForPath(
    path: string
  ): Promise<CMSContent>;
}
