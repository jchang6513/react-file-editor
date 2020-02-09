import MockDate from 'mockdate';
import { FilesRepository } from "../filesRepository";
import { LocalStorageAPI } from "../../api/localStorageAPI";
import { File } from "../filesRepository";
import { Callbacks } from "../base/repositoryCallbacks";

jest.mock('../../api/localStorageAPI');

const api = new LocalStorageAPI();
const repo = new FilesRepository(api);

let error: Error;
let file: File;
const voidCallbacks: Callbacks<void> = {
  onSuccess: jest.fn(() => {} ),
  onError: jest.fn((e) => { error = e; }),
};
const fileCallbacks: Callbacks<File> = {
  onSuccess: jest.fn((f) => { file = f; }),
  onError: jest.fn((e) => { error = e; }),
};

const testNewFile: File = {
  fileName: 'new file',
  content: "const foo = 'foo'",
};
const testFileId = new Date('2020-01-01 00:00').getTime();
const testFile: File = {
  id: testFileId,
  fileName: 'old file',
  content: "const goo = 'goo'",
};

const fakeDate = '2020-01-28 12:34';

const mocked = (f: any) => f as jest.Mock;

describe('FileRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    MockDate.set(fakeDate);
  })

  describe('create file', () => {
    it('execute create with object', () => {
      const id = new Date('2020-01-28 12:34').getTime();
      repo.create(testNewFile, fileCallbacks);
      // execute with filename and file object
      expect(api.createWithObject).toBeCalledTimes(1);
      expect(api.createWithObject).toBeCalledWith(
        String(id),
        {
          id,
          ...testNewFile,
        }
      );
    });
    it('create with object successfully', () => {
      (api.createWithObject as jest.Mock).mockImplementation(() => {})
      repo.create(testNewFile, fileCallbacks);

      // execute on success callback
      expect(fileCallbacks.onSuccess).toBeCalled();
      expect(fileCallbacks.onError).not.toBeCalled();
    });
    it('create with object failed', () => {
      const testError = new Error('test');
      (api.createWithObject as jest.Mock).mockImplementation(() => {
        throw testError;
      })
      repo.create(testNewFile, fileCallbacks);

      // execute on success callback
      expect(fileCallbacks.onSuccess).not.toBeCalled();
      expect(fileCallbacks.onError).toBeCalled();
      expect(error).toEqual(testError);
    });
  });

  describe('get file', () => {
    it('execute get from object', () => {
      repo.get(testFileId, fileCallbacks);
      // execute with filename and file object
      expect(api.getFromObject).toBeCalledTimes(1);
      expect(api.getFromObject).toBeCalledWith(String(testFileId));
    });
    it('get from object successfully', () => {
      (api.getFromObject as jest.Mock).mockReturnValue(testFile);
      repo.get(testFileId, fileCallbacks);
      // execute on success callback and get file
      expect(fileCallbacks.onSuccess).toBeCalled();
      expect(file).toEqual(testFile);
    });
    it('get from object failed', () => {
      const testError = new Error('get file failed');
      (api.getFromObject as jest.Mock).mockImplementation(() => {
        throw testError;
      })
      repo.get(testFileId, fileCallbacks);

      // execute on success callback
      expect(fileCallbacks.onSuccess).not.toBeCalled();
      expect(fileCallbacks.onError).toBeCalled();
      expect(error).toEqual(testError);
    });
  });

  describe('update file', () => {
    it('execute update with object', () => {
      repo.update(testFileId, testFile, fileCallbacks);
      // execute with filename and file object
      expect(api.updateWithObject).toBeCalledTimes(1);
      expect(api.updateWithObject).toBeCalledWith(String(testFileId), testFile);
    });
    it('update with object successfully', () => {
      repo.update(testFileId, testFile, fileCallbacks);
      // execute on success callback and get file
      expect(fileCallbacks.onSuccess).toBeCalled();
      expect(fileCallbacks.onError).not.toBeCalled();
      expect(file).toEqual(testFile);
    });
    it('update with object failed', () => {
      const testError = new Error('get file failed');
      (api.updateWithObject as jest.Mock).mockImplementation(() => {
        throw testError;
      })
      repo.update(testFileId, testFile, fileCallbacks);

      // execute on success callback
      expect(fileCallbacks.onSuccess).not.toBeCalled();
      expect(fileCallbacks.onError).toBeCalled();
      expect(error).toEqual(testError);
    });
  });
  describe('delete file', () => {
    it('execute delete', () => {
      repo.delete(testFileId, voidCallbacks);
      // execute with filename and file object
      expect(api.delete).toBeCalledTimes(1);
      expect(api.delete).toBeCalledWith(String(testFileId));
    });
    it('delete successfully', () => {
      repo.delete(testFileId, voidCallbacks);
      // execute on success callback and get file
      expect(voidCallbacks.onSuccess).toBeCalled();
      expect(voidCallbacks.onError).not.toBeCalled();
      expect(file).toEqual(testFile);
    });
    it('delete failed', () => {
      const testError = new Error('get file failed');
      (api.delete as jest.Mock).mockImplementation(() => {
        throw testError;
      })
      repo.delete(testFileId, voidCallbacks);

      // execute on success callback
      expect(voidCallbacks.onSuccess).not.toBeCalled();
      expect(voidCallbacks.onError).toBeCalled();
      expect(error).toEqual(testError);
    });
  });
});
