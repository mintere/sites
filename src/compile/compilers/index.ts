import { AbstractCompiler } from "./abstract";
import compileHandlebars from "./handlebars";
import { CompiledFileType, FileType } from '../../common/file-types';

const compilerMap: Record<CompiledFileType, AbstractCompiler> &
  Partial<Record<Exclude<FileType, CompiledFileType>, undefined>> = {
  [FileType.handlebars]: compileHandlebars
};

export default compilerMap;
