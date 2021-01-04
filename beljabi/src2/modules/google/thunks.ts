import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { GoogleAction } from './types';
import { getUserProfileAsync } from './actions';
import firebase from "firebase/app";
import { auth, provider } from "../../firebase";

export function getUserProfileThunk(): ThunkAction<void, RootState, null, GoogleAction> {
  return async dispatch => {
    const { request, success, failure } = getUserProfileAsync;
    dispatch(request());
    try {
      auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
          firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                  dispatch(success(user));
              } else {
                  auth.signInWithPopup(provider)
                      .then((result) => {
                        dispatch(success(result.user));
                      }).catch((error) => {
                        dispatch(failure(error))
                        alert(error.message);
                      });
              }
          })
      })
    } catch (e) {
      dispatch(failure(e));
    }
  };
}

export function setUserProfileNullThunk(): ThunkAction<void, RootState, null, GoogleAction> {
  return async dispatch => {
    const { request , success, failure } = getUserProfileAsync;
    dispatch(success(null))
  }
}