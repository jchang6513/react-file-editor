import { Repository as BaseRepository } from "../base/repository";
import { Callbacks } from "../base/repositoryCallbacks";

export type Dir = {
  [key in string]: Dir[] | String[];
};

export type File = {
  id?: number;
  fileName: string;
  content: string;
};

export namespace Files {
  export interface Repository extends Omit<BaseRepository<File>, 'delete'> {
    listDirectories: (dir: string, callbacks: Callbacks<Dir>) => void;
    delete: (id: number, callbacks: Callbacks<void>) => void;
  }
}
