import { Repository as BaseRepository } from "../base/repository";
import { Callbacks } from "../base/repositoryCallbacks";

export type Dir = {
  [key in string]: Dir[] | String[];
};

export type File = {
  fileName: string;
  content: string;
};

export namespace Files {
  export interface Repository extends BaseRepository<File> {
    listDirectories: (dir: string, callbacks: Callbacks<Dir>) => void;
  }
}
