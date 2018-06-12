import * as types from '../actions/actionTypes';

export default function setup(state ={
  options: {}
}, action) {
  switch (action.type) {
    case types.SET_OPTIONS:
      return {
        ...state,
        options: {
          ...state.options,
          ...action.options
        }
      }

    default:
      return state;

  }
}
