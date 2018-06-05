import Api from '../api/Api';
import * as types from './actionTypes'

export const requestCards = () => {
  return (dispatch) => {
    return Api.getAllCards().then(data => {
      dispatch(loadCardsSuccess(data))
    }).catch(error => {
      console.log(error);
    })
  }
}

export const requestStartGame = () => {
  return (dispatch) => {
    return Api.startGame().then(data => {
      dispatch(startGameSuccess(data))
    }).catch(error => {
      console.log(error)
    })
  }
}

const loadCardsSuccess = (_data) => {
  return {
    type: types.LOAD_CARDS_SUCCESS,
    data: {
      status: 'LOAD_CARDS_SUCCESFULL',
      cards: _data.cards
    }
  }
}

const startGameSuccess = (_data) => {
  return {
    type: types.START_GAME_SUCCESS,
    data: {
      game: _data
    }
  }
}
