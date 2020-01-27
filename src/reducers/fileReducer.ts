import { Action } from "redux";

type FileState = {

};

const initState = {

};

export const fileReducer = (state: FileState = initState, action: Action): FileState => {
  switch(action.type) {
    default:
      return state;
  }
};
