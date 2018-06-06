import * as types from '../actions/actionTypes';

export default function cards(state = {
  isFetching: false,
  cards: {}
}, action) {
  switch(action.type) {
    case types.LOAD_CARDS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.LOAD_CARDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cards: {
          ...action.data
        }
      }
    case types.LOAD_CARDS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state;
  }
}
