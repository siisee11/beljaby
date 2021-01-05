import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { GoogleAction } from './types';
import { getUserProfileAsync } from './actions';
import firebase from "firebase/app";
import { auth, provider } from "../../firebase";

export function setUserProfileThunk(user: firebase.User): ThunkAction<void, RootState, null, GoogleAction> {
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