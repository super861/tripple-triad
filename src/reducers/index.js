import { combineReducers } from 'redux';
import cards from './cards';
import game from './game';
import setup from './setup';

const rootReducer = combineReducers({
  cards,
  game,
  setup
})

export default rootReducer;
