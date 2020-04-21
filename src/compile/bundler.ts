import { Readable } from "readable-stream";
import { fileTypeForName, fileTypeIsCompiled } from "../common/file-types";
import compile from "./compiler";
import { TemplateSchema } from "../common/schema";
import { BundleStorer, FileMetadata } from "../common/bundle";

export default async function bundleFile(
  fileName: string,
  stream: Readable,
  store: BundleStorer
): Promise<TemplateSchema[]> {
  if (fileName.endsWith("/"))
    throw new Error(`file (${fileName}) name cannot end with "/"`);

  const fileType = fileTypeForName(fileName);

  let templateSchemas: TemplateSchema[] = [];

  let fileMetadata: FileMetadata = {
    contentType: fileType,
  };

  if (fileTypeIsCompiled(fileType)) {
    const { partials, file } = await compile(fileType, fileName, stream, {});

    if (typeof partials !== "undefined") store.storePartials(partials);

    if (typeof file === "undefined") return [];

    stream = file.stream;

    if (typeof file.metadata !== "undefined")
      fileMetadata.compilerMetadata = file.metadata;

    if (typeof file.templateSchema !== "undefined")
      templateSchemas.push(file.templateSchema);
  }

  await store.storeFile(fileName, {
    stream,
    metadata: fileMetadata,
  });

  return templateSchemas;
}
