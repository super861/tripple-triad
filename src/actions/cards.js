import * as types from './actionTypes'

export const shouldFetchCards = state => {
  const {cards} = state

  if(!cards) {
    return true;
  }
  else if(!(cards.cards[1])) {
    return true;
  }
  else {
    return cards.isFetching
  }
}

export const loadCardsRequest = () => {
  return {
    type: types.LOAD_CARDS_REQUEST
  }
}

export const loadCardsSuccess = (data) => {
  return {
    type: types.LOAD_CARDS_SUCCESS,
    data: data.cards
  }
}

export const loadCardsFailure = (error) => {
  return {
    type: types.LOAD_CARDS_FAILURE,
    error
  }
}
