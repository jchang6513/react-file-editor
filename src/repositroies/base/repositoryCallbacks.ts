export interface ErrorCallback {
  onError: (e: Error) => void;
}

export interface SuccessCallback<R> {
  onSuccess: (result: R) => void;
}

export interface SuccessWithoutResultCallback {
  onSuccess: () => void;
}

export interface Callbacks<R> extends SuccessCallback<R>, ErrorCallback {}
