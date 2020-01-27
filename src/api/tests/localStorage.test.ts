import 'jest-localstorage-mock';

import { LocalStorageAPI } from "../localStorageAPI"

const localStorageAPI = new LocalStorageAPI();
const keyName = 'key name';
const keyValue = {
  value: 'local storage'
};
const keyValueString = JSON.stringify(keyValue);

describe('local storage api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })
  it('create', () => {
    localStorageAPI.create(keyName, keyValueString);

    expect(localStorage.setItem).toHaveBeenCalledWith(keyName, keyValueString);
    expect(localStorage.__STORE__[keyName]).toEqual(keyValueString);
  })
  it('create with object', () => {
    localStorageAPI.createWithObject(keyName, keyValue);

    expect(localStorage.setItem).toHaveBeenCalledWith(keyName, keyValueString);
    expect(localStorage.__STORE__[keyName]).toEqual(keyValueString);
  })
  it('get', () => {
    localStorage.__STORE__[keyName] = keyValueString;
    const value = localStorageAPI.get(keyName);

    expect(localStorage.getItem).toHaveBeenCalledWith(keyName);
    expect(value).toEqual(keyValueString);
  })
  it('get from object', () => {
    localStorage.__STORE__[keyName] = keyValueString;
    const value = localStorageAPI.getFromObject(keyName);

    expect(localStorage.getItem).toHaveBeenCalledWith(keyName);
    expect(value).toEqual(keyValue);
  })
  it('update', () => {
    localStorage.__STORE__[keyName] = 'default value';
    localStorageAPI.update(keyName, keyValueString);

    expect(localStorage.setItem).toHaveBeenCalledWith(keyName, keyValueString);
    expect(localStorage.__STORE__[keyName]).toEqual(keyValueString);
  })
  it('update with object', () => {
    localStorage.__STORE__[keyName] = 'default value';
    localStorageAPI.updateWithObject(keyName, keyValue);

    expect(localStorage.setItem).toHaveBeenCalledWith(keyName, keyValueString);
    expect(localStorage.__STORE__[keyName]).toEqual(keyValueString);
  })
  it('delete', () => {
    localStorageAPI.delete(keyName);

    expect(localStorage.removeItem).toHaveBeenCalledWith(keyName);
    expect(localStorage.__STORE__[keyName]).toBeUndefined();
  })
})
