import { combineReducers } from 'redux';
import google from "./google"
import riot from "./riot"

const rootReducer = combineReducers({
  google,
  riot,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>