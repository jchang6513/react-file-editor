import { FilesRepository } from "../filesRepository";
import { LocalStorageAPI } from "../../api/localStorageAPI";
import { File, Dir } from "../interface/files";
import { Callbacks } from "../base/repositoryCallbacks";

jest.mock('../../api/localStorageAPI');

const api = new LocalStorageAPI();
const repo = new FilesRepository(api);

let testError: Error;
const fileCallbacks: Callbacks<File> = {
  onSuccess: jest.fn(() => {}),
  onError: jest.fn((e) => { testError = e; }),
};

const testFile: File = {
  fileName: 'new file',
  content: "const foo = 'foo'",
};

describe('FileRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  })

  describe('create file', () => {
    it('execute create with object', () => {
      repo.create(testFile, fileCallbacks);
      // execute with filename and file object
      expect(api.createWithObject).toBeCalledWith(testFile.fileName, testFile);
    });
    it('create with object on success', () => {
      (api.createWithObject as jest.Mock).mockImplementation(() => {})
      repo.create(testFile, fileCallbacks);

      // execute on success callback
      expect(fileCallbacks.onSuccess).toBeCalled();
      expect(fileCallbacks.onError).not.toBeCalled();
    });
    it('create with object on success', () => {
      (api.createWithObject as jest.Mock).mockImplementation(() => {
        throw new Error('test');
      })
      repo.create(testFile, fileCallbacks);

      // execute on success callback
      expect(fileCallbacks.onSuccess).not.toBeCalled();
      expect(fileCallbacks.onError).toBeCalled();
    });
  });
});
