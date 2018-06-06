import Api from '../api/Api';
import * as types from './actionTypes'
import {shouldFetchCards, loadCardsRequest, loadCardsSuccess, loadCardsFailure} from './cards';
import {shouldFetchGame, startGameRequest, startGameSuccess, startGameFailure} from './game';

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

export const fetchSetup = () => {
  return(dispatch, getState) => {
    if(shouldFetchGame(getState())) {
      dispatch(startGameRequest())
    }

    return Api.call('/game/setup', {
      isFetching: getState().game.isFetching
    }).then(data => {
      if(!getState().game.isFetching)
        Promise.reject();
      dispatch(startGameSuccess(data))
    }).catch(error => {
      dispatch(startGameFailure(error))
    })
  }
}


// export const fetchData = (request) => {
//   return (dispatch, getState) => {
//     const state = getState();
//     let url = '/game/' + request;
//
//     if(request === 'cards' && shouldFetchCards(state)) {
//       dispatch(loadCardsRequest())
//     }
//     if(request === 'setup' && shouldFetchGame(state)) {
//       dispatch(startGameRequest())
//     }
//
//     switch(request) {
//       case 'cards':
//         return Api.call(url, {
//           isFetching: getState().cards.isFetching
//         }).then(data => {
//           dispatch(loadCardsSuccess(data))
//         }).catch(error => {
//           dispatch(loadCardsFailure(error))
//         })
//       case 'setup':
//       return Api.call(url, {
//         isFetching: getState().game.isFetching
//       }).then(data => {
//         if(!getState().game.isFetching)
//           Promise.reject();
//         dispatch(startGameSuccess(data))
//       }).catch(error => {
//         dispatch(startGameFailure(error))
//       })
//       default:
//         break;
//     }
//   }
// }
