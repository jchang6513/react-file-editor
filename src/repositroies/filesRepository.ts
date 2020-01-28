import { Files, Dir, File } from "./interface/files";
import { Callbacks } from "./base/repositoryCallbacks";
import { LocalStorageAPI } from "../api/localStorageAPI";

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

  update(id: number, object: File, callbacks: Callbacks<File>) {

  }

  delete(id: number, callbacks: Callbacks<File>) {

  }
}
