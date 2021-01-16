import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { RiotAction } from './types';
import { getUserProfileAsync } from './actions';

export function getUserProfileThunk(username: string): ThunkAction<void, RootState, null, RiotAction> {
  return async dispatch => {
    const { request, success, failure } = getUserProfileAsync;
    dispatch(request());
    try {
      const userProfile = await getUser(username);
      dispatch(success(userProfile));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}

export function setUserProfileThunk(user: object): ThunkAction<void, RootState, null, RiotAction> {
  return async dispatch => {
    const { request, success, failure } = getUserProfileAsync;
    dispatch(request());
    try {
      const userProfile = await getUser(user);
      dispatch(success(userProfile));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}