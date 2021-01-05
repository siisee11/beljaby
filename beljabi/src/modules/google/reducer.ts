import { createReducer } from 'typesafe-actions';
import { GoogleState, GoogleAction } from './types';
import { GET_USER_PROFILE, GET_USER_PROFILE_SUCCESS, GET_USER_PROFILE_ERROR } from './actions';

const initialState: GoogleState = {
  userProfile: {
    gloading: false,
    gerror: null,
    user: null,
  }
};

const github = createReducer<GoogleState, GoogleAction>(initialState, {
  [GET_USER_PROFILE]: state => ({
    ...state,
    userProfile: {
      gloading: true,
      gerror: null,
      user: null,
    }
  }),
  [GET_USER_PROFILE_SUCCESS]: (state, action) => ({
    ...state,
    userProfile: {
      gloading: false,
      gerror: null,
      user: action.payload
    }
  }),
  [GET_USER_PROFILE_ERROR]: (state, action) => ({
    ...state,
    userProfile: {
      gloading: false,
      gerror: action.payload,
      user: null
    }
  })
});

export default github;