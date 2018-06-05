import * as types from '../actions/actionTypes';

const initialState = {
  cards: {}
};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.LOAD_CARDS_SUCCESS:
      return {
        ...state,
        ...action.data,
        cards: {
          ...action.data.cards
        }
      }
    case types.START_GAME_SUCCESS:
      return {
        ...state,
        game: {
          ...state.game,
          ...action.data.game
        }
      }

    default:
      return state;
  }
}

export default rootReducer;
