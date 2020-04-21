import { Readable } from "readable-stream";
import { FileType } from './file-types';

export interface FileMetadata {
  contentType: FileType;
  compilerMetadata?: any;
}

export interface StoredFile {
  stream: Readable;
  metadata: FileMetadata;
}

export interface StoredPartials {
  [k: string]: string
}

export interface BundleStorer {
  storeFile(fileName: string, file: StoredFile): Promise<void>

  /** May be called multiple times with subsets */
  storePartials(partials: StoredPartials): Promise<void>
}

export interface BundleRetrieval {
  retrieveFile(fileName: string): Promise<StoredFile | undefined>

  retrievePartials(): Promise<StoredPartials>
}