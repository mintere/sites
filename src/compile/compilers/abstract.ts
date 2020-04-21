import { CompiledFileType } from '../../common/file-types';
import { StoredPartials } from "../../common/bundle";
import { CompileContext } from '../../common/context';

export type CompilerResponse = {
  file?: {
    compiled: string;
    metadata?: any;
  }
  handlebarsPartials?: StoredPartials;
};

export type AbstractCompiler = (
  uid: string,
  source: string,
  opts: {
    frontMatter: any,
    fileType: CompiledFileType,
    context: CompileContext
  }
) => Pick<Promise<CompilerResponse>, "then">;
