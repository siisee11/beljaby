import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { GoogleAction } from './types';
import { getUserProfileAsync } from './actions';
import * as Google from 'expo-google-app-auth';

export function setUserProfileThunk(user: Google.GoogleUser): ThunkAction<void, RootState, null, GoogleAction> {
  return async dispatch => {
    const { request, success, failure } = getUserProfileAsync;
    dispatch(request());
    try {
      dispatch(success(user))
    } catch (e) {
      dispatch(failure(e));
    }
  };
}

export function setUserProfileLoadingThunk(): ThunkAction<void, RootState, null, GoogleAction> {
  return async dispatch => {
    const { request } = getUserProfileAsync;
    dispatch(request());
  };
}

export function setUserProfileNullThunk(): ThunkAction<void, RootState, null, GoogleAction> {
  return async dispatch => {
    const { success } = getUserProfileAsync;
    dispatch(success(null))
  }
}