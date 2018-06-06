import * as types from '../actions/actionTypes';

export default function cards(state = {
  isFetching: false,
  game: {}
}, action) {
  switch(action.type) {
    case types.START_GAME_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.START_GAME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        game: {
          ...action.data
        }
      }
    case types.START_GAME_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state;
  }
}
