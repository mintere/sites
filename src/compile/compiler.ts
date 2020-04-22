import getRawBody from "raw-body";
import { PassThrough, Readable } from "readable-stream";
import { CompiledFileType } from "../common/file-types";
import compilerMap from "./compilers";
import { CompileContext } from "../common/context";
import { TemplateSchema } from "../common/schema";
import FrontmatterExtractor from "../common/frontmatter-extractor";
import { StoredPartials } from '../common/bundle';

const MAX_COMPILE_SIZE = "2mb";

type StreamCompilationResult = {
  partials?: StoredPartials;
  file?:
    | {
        content: Buffer | String;
        metadata?: any;
        templateSchema?: TemplateSchema;
      }
    | undefined;
};

export default async function compile(
  fileType: CompiledFileType,
  fileName: string,
  stream: Readable,
  context: CompileContext
): Promise<StreamCompilationResult> {
  let frontMatter;
  [stream, frontMatter] = await FrontmatterExtractor.extract(stream);

  // If the file is to be compiled, read the full stream into memory
  const source = (
    await getRawBody(stream, { limit: MAX_COMPILE_SIZE })
  ).toString();

  const compiler = compilerMap[fileType];

  const { file: compiledFile, handlebarsPartials } = await compiler(
    fileName,
    source,
    { fileType, context, frontMatter }
  );

  let compilationResult: StreamCompilationResult = {};

  if (typeof handlebarsPartials !== "undefined")
    compilationResult.partials = handlebarsPartials;

  if (typeof compiledFile !== "undefined") {
    compilationResult.file = { content: compiledFile.compiled };

    if (typeof compiledFile.metadata !== "undefined")
      compilationResult.file.metadata = compiledFile.metadata;

    if (typeof frontMatter !== "undefined")
      compilationResult.file.templateSchema = {
        uid: fileName,
        frontMatter: frontMatter,
      };
  }

  return compilationResult;
}
