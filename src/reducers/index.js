import * as types from '../actions/actionTypes';
import { combineReducers } from 'redux';
import cards from './cards';
import game from './game';

// const initialState = {
//   isFetching: false
// };

// const rootReducer = (state = initialState, action) => {
//   switch(action.type) {
//     case types.LOAD_CARDS_REQUEST:
//       return {
//         ...state,
//         isFetching: true
//       }
//     case types.LOAD_CARDS_SUCCESS:
//       return {
//         ...state,
//         isFetching: false,
//         cards: {
//           ...action.data
//         }
//       }
//     case types.START_GAME_SUCCESS:
//       return {
//         ...state,
//         game: {
//           ...state.game,
//           ...action.data.game
//         }
//       }
//
//     default:
//       return state;
//   }
// }

const rootReducer = combineReducers({
  cards,
  game
})

export default rootReducer;
