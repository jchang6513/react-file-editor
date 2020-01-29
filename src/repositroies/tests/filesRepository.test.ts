import MockDate from 'mockdate';
import { FilesRepository } from "../filesRepository";
import { LocalStorageAPI } from "../../api/localStorageAPI";
import { File, Dir } from "../interface/files";
import { Callbacks } from "../base/repositoryCallbacks";

jest.mock('../../api/localStorageAPI');

const api = new LocalStorageAPI();
const repo = new FilesRepository(api);

let error: Error;
let file: File;
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
    it('execute get from object successfully', () => {
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
    it('execute update with object successfully', () => {
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
});
