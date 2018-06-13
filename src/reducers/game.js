import * as types from '../actions/actionTypes';

export default function cards(state = {
  isFetching: false,
  game: {}
}, action) {
  switch(action.type) {
    case types.LOAD_GAME_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.LOAD_GAME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        game: {
          ...state.game,
          ...action.data
        }
      }
    case types.LOAD_GAME_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case types.SET_STATUS_NEW:
      return {
        ...state,
        game: {
          ...state.game,
          status: action.status
        }
      }
    default:
      return state;
  }
}
