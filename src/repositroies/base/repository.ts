import { Callbacks } from "./repositoryCallbacks";

export interface Repository<R extends object> {
  create: (object: R, callbacks: Callbacks<R>) => void;
  get: (id: number, callbacks: Callbacks<R>) => void;
  update: (id: number, object: R, callbacks: Callbacks<R>) => void;
  delete: (id: number, callbacks: Callbacks<R>) => void;
}
