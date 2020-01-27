import { combineReducers } from 'redux'
import { fileReducer } from './fileReducer';

export const reducer = combineReducers(
  fileReducer
);
