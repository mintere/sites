export enum FileType {
  handlebars = "text/x-handlebars-template",
  json = "application/json",
  plainText = "text/plain",
  arbitraryBinary = "application/octet-stream",
  css = "text/css",
  javascript = "text/javascript",
  jpeg = "image/jpeg",
  gif = "image/gif",
  png = "image/png",
  ico = "image/x-icon",
  apng = "image/apng",
  webp = "image/webp",
  html = "text/html",
  svg = "image/svg+xml"
}

export const fileExtensionMap: {
  [ext: string]: FileType | undefined;
} = {
  hbs: FileType.handlebars,
  handlebars: FileType.handlebars,
  txt: FileType.plainText,
  json: FileType.json,
  css: FileType.css,
  js: FileType.javascript,
  jpeg: FileType.jpeg,
  jpg: FileType.jpeg,
  gif: FileType.gif,
  png: FileType.png,
  apng: FileType.apng,
  webp: FileType.webp,
  svg: FileType.svg
};

export type CompiledFileType = FileType.handlebars;

export const compiledFileTypes: Record<CompiledFileType, true> &
  Partial<Record<Exclude<FileType, CompiledFileType>, false | undefined>> = {
  [FileType.handlebars]: true
};

export function fileTypeIsCompiled(fileType: FileType): fileType is CompiledFileType {
  return compiledFileTypes[fileType] === true;
}

const EXTENSION_PATTERN = /\.([^.]+)$/;

export function fileTypeForName(fileName: string): FileType {
  const match = fileName.match(EXTENSION_PATTERN);
  if (!match) return FileType.arbitraryBinary;

  return fileExtensionMap[match[1]] || FileType.arbitraryBinary;
}