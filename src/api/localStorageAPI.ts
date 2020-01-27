export namespace LocalStorage {
  export interface API {
    create: (keyName: string, keyValue: any) => void;
    createFromObject: (keyName: string, keyValue: object) => void;
    get: (keyName: string) => void;
    update: (keyName: string, keyValue: any) => void;
    updateFromObject: (keyName: string, keyValue: object) => void;
    delete: (keyName: string) => void;
  }
};
