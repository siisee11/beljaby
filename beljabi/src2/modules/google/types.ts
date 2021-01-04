import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import firebase from 'firebase'

export type GoogleAction = ActionType<typeof actions>;

export type GoogleState = {
  userProfile: {
    loading: boolean;
    error: Error | null;
    user: firebase.User | null;
  };
};