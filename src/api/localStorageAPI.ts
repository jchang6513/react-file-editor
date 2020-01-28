export interface LocalStorageAPI {
  create(keyName: string, keyValue: any): void;
  createWithObject(keyName: string, keyValue: object): void;
  get(keyName: string): string | null;
  getFromObject(keyName: string): object | string | null;
  update(keyName: string, keyValue: any): void;
  updateWithObject(keyName: string, keyValue: object): void;
  delete(keyName: string): void;
}

export class LocalStorageAPI implements LocalStorageAPI {
  create(keyName: string, keyValue: any) {
    localStorage.setItem(keyName, keyValue)
  }

  createWithObject(keyName: string, keyValue: object) {
    const value = JSON.stringify(keyValue);
    localStorage.setItem(keyName, value)
  }

  get(keyName: string) {
    return localStorage.getItem(keyName)
  }

  getFromObject(keyName: string) {
    const value = localStorage.getItem(keyName)
    return value
      ? JSON.parse(value) as object
      : value;
  }

  update(keyName: string, keyValue: any) {
    localStorage.setItem(keyName, keyValue)
  }

  updateWithObject(keyName: string, keyValue: object) {
    const value = JSON.stringify(keyValue);
    localStorage.setItem(keyName, value)
  }

  delete(keyName: string) {
    localStorage.removeItem(keyName);
  }
}
