import * as types from './actionTypes'

export const shouldFetchGame = state => {
  const {game} = state

  if(!game) {
    return true;
  }
  else if(!(game.code)) {
    return true;
  }
  else {
    return game.isFetching
  }

}

export const loadGameRequest = () => {
  return {
    type: types.LOAD_GAME_REQUEST
  }
}

export const loadGameSuccess = (data) => {
  return {
    type: types.LOAD_GAME_SUCCESS,
    data
  }
}

export const loadGameFailure = (error) => {
  return {
    type: types.LOAD_GAME_FAILURE,
    error
  }
}

export const setStatusNew = (status) => {
  return {
    type: types.SET_STATUS_NEW,
    status
  }
}
