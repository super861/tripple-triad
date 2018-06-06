import * as types from './actionTypes'

export const shouldFetchGame = state => {
  const {game, isFetching} = state

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

export const startGameRequest = () => {
  return {
    type: types.START_GAME_REQUEST
  }
}

export const startGameSuccess = (data) => {

  return {
    type: types.START_GAME_SUCCESS,
    data
  }
}

export const startGameFailure = (error) => {
  return {
    type: types.START_GAME_FAILURE,
    error
  }
}
