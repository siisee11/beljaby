import { combineReducers } from 'redux';
import user from './google/user'
import github from './github'
import google from "./google"
import riot from "./riot"
import beljabi from "./beljabi"
import dark from "./dark"

const rootReducer = combineReducers({
  user,
  github,
  google,
  beljabi,
  riot,
  dark,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>