import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import firebase from 'firebase'

export type GoogleAction = ActionType<typeof actions>;

export type GoogleState = {
  userProfile: {
    gloading: boolean;
    gerror: Error | null;
    user: firebase.User | null;
  };
};