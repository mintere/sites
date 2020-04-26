import { RenderContext } from '../common/context';
import { BundleRetrieval } from '../common/bundle';

export interface HandlebarsHelperContext extends Handlebars.HelperOptions {
  name: string;
  hash: {};
  data: { root: object };
  loc: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  };

  /**
   * lookupProperty(object, propertyName): a function that returns an "own property" of an object.
   * Whitelists specified in allowedProtoProperties and allowedProtoMethods are respected by this function. */
  lookupProperty(object: object, propertyName: string): any;
}

export interface HandlebarsHelperGlobalContext {
  compilerMetadata: any;
  renderContext: RenderContext;

  blocks: {
    [k: string]: Handlebars.TemplateDelegate;
  }

  renderTemplate(template: Handlebars.TemplateDelegate, data: any): string

  mintereFormsHeadRendered?: true;
}

export abstract class HandlebarsHelper {
  globalCtx: HandlebarsHelperGlobalContext;
  handlebarsDelegate: Handlebars.HelperDelegate;

  abstract helper(
    ctx: HandlebarsHelperContext,
    args: any[],
    content: () => string | undefined
  ): any;

  constructor(globalCtx: HandlebarsHelperGlobalContext) {
    this.globalCtx = globalCtx;

    const _this = this;

    this.handlebarsDelegate = function(..._args: any[]) {
      const ctx: HandlebarsHelperContext = _args[_args.length - 1];
      const args = _args.slice(0, -1);

      const content = ctx.fn && (() => ctx.fn(this));

      return _this.helper(ctx, args, content);
    };
  }
}
