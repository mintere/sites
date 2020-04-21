import { RenderContext } from '../common/context';
import { RenderedResult } from '../render';
import { BundleRetrieval } from '../common/bundle';
import { StoredFile } from '../common/bundle';

export type AbstractRenderer = (
  file: StoredFile,
  renderData: any,
  context: RenderContext,
  bundle: BundleRetrieval
) => Pick<Promise<RenderedResult>, "then">;
