import MockDate from 'mockdate';
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
      repo.create(testFile, fileCallbacks);
      // execute with filename and file object
      expect(api.createWithObject).toBeCalledTimes(1);
      expect(api.createWithObject).toBeCalledWith(
        String(id),
        {
          id,
          ...testFile,
        }
      );
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
