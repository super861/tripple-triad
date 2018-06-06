import Api from '../api/Api';
import {shouldFetchCards, loadCardsRequest, loadCardsSuccess, loadCardsFailure} from './cards';
import {shouldFetchGame, loadGameRequest, loadGameSuccess, loadGameFailure} from './game';

export const fetchCards = () => {
  return (dispatch, getState) => {
    if(shouldFetchCards(getState())) {
      dispatch(loadCardsRequest())
    }

    return Api.call('/game/cards', {
      isFetching: getState().cards.isFetching
    }).then(data => {
      dispatch(loadCardsSuccess(data))
    }).catch(error => {
      dispatch(loadCardsFailure(error))
    })
  }
}

export const fetchGame = (action, _body = {}) => {
  return(dispatch, getState) => {
    if(shouldFetchGame(getState())) {
      dispatch(loadGameRequest())
    }
    if(action === 'setup') {
      return Api.call('/game/setup', {
        isFetching: getState().game.isFetching
      }).then(data => {
        dispatch(loadGameSuccess(data))
      }).catch(error => {
        dispatch(loadGameFailure(error))
      })
    }
    else {
      let url = '/game/' + action;
      let state = getState();
      return Api.call(url, {
        method: 'POST',
        body: _body,
        code: state.game.game.code,
        isFetching: state.game.isFetching
      }).then(data => {
        dispatch(loadGameSuccess(data))
      }).catch(error => {
        dispatch(loadGameFailure(error))
      })
    }
  }

}



// export const tosscoin = () => {
//   return (dispatch, getState)
// }
