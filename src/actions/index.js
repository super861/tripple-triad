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

export const fetchGame = (_action, _body = {}) => {
  return(dispatch, getState) => {
    console.log('REQUEST SENT ++++++++', _action, '++++++++')
    if(shouldFetchGame(getState())) {
      dispatch(loadGameRequest())
    }
    if(_action === 'setup') {
      return Api.call('/game/setup', {
        method: 'POST',
        isFetching: getState().game.isFetching,
        action: _action
      }).then(data => {
        dispatch(loadGameSuccess(data))
      }).catch(error => {
        dispatch(loadGameFailure(error))
      })
    }
    else {
      let url = '/game/' + _action;
      let state = getState();
      return Api.call(url, {
        method: 'POST',
        body: _body,
        code: state.game.game.code,
        isFetching: state.game.isFetching,
        action: _action
      }).then(data => {
        dispatch(loadGameSuccess(data))
      }).catch(error => {
        dispatch(loadGameFailure(error))
      })
    }
  }

}
