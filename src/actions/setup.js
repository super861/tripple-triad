import * as types from './actionTypes';

export const setOptions = options => {
  return {
    type: types.SET_OPTIONS,
    options
  }
}
