import { Repository as BaseRepository } from "./base/repository";
import { Callbacks } from "./base/repositoryCallbacks";
import { LocalStorageAPI } from "../api/localStorageAPI";

export type Dir = {
  [key in string]: Dir[] | String[];
};

export type File = {
  id?: number;
  fileName: string;
  content: string;
};

export declare namespace Files {
  export interface Repository extends Omit<BaseRepository<File>, 'delete'> {
    listDirectories: (dir: string, callbacks: Callbacks<Dir>) => void;
    delete: (id: number, callbacks: Callbacks<void>) => void;
  }
}

export class FilesRepository implements Files.Repository {
  private localStorageAPI: LocalStorageAPI;

  constructor(localStorageAPI: LocalStorageAPI) {
    this.localStorageAPI = localStorageAPI;
  }

  listDirectories(dir: string, callbacks: Callbacks<Dir>) {

  }

  create(file: File, callbacks: Callbacks<File>) {
    const id = new Date().getTime();
    const sId = String(id);
    const newFile = {
      ...file,
      id
    };
    try {
      this.localStorageAPI.createWithObject(String(id), newFile);
      callbacks.onSuccess(file);
    } catch(e) {
      callbacks.onError(e)
    }
  }

  get(id: number, callbacks: Callbacks<File>) {
    const sId = String(id);
    try {
      const file = this.localStorageAPI.getFromObject(sId) as File;
      callbacks.onSuccess(file);
    } catch(e) {
      callbacks.onError(e);
    }
  }

  update(id: number, file: File, callbacks: Callbacks<File>) {
    const sId = String(id);
    try {
      this.localStorageAPI.updateWithObject(sId, file);
      callbacks.onSuccess(file);
    } catch(e) {
      callbacks.onError(e);
    }
  }

  delete(id: number, callbacks: Callbacks<void>) {
    const sId = String(id);
    try {
      this.localStorageAPI.delete(sId);
      callbacks.onSuccess();
    } catch(e) {
      callbacks.onError(e);
    }
  }
}
