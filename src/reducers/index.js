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

    default:
      return state;
  }
}

export default rootReducer;
