import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { BeljabiAction } from './types';
import { getUserProfileAsync } from './actions';
import { getUser, setUser, BeljabiProfile } from '../../api/beljabi';

export function getAppUserProfileThunk(email: string): ThunkAction<void, RootState, null, BeljabiAction> {
  return async dispatch => {
    const { request, success, failure } = getUserProfileAsync;
    dispatch(request());
    try {
      const userProfile = await getUser(email);
      dispatch(success(userProfile));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}

export function setAppUserProfileThunk(user: BeljabiProfile): ThunkAction<void, RootState, null, BeljabiAction> {
  return async dispatch => {
    const { request, success, failure } = getUserProfileAsync;
    dispatch(request());
    try {
      const userProfile = await setUser(user);
      dispatch(success(userProfile))
    } catch (e) {
      dispatch(failure(e))
    }
  };
}

export function setAppUserProfileNullThunk(): ThunkAction<void, RootState, null, BeljabiAction> {
  return async dispatch => {
    const { request, success, failure } = getUserProfileAsync;
    dispatch(success(null))
  };
}