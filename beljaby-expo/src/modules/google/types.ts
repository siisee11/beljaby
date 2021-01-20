import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import * as Google from 'expo-google-app-auth';

export type GoogleAction = ActionType<typeof actions>;

export type GoogleState = {
  userProfile: {
    gloading: boolean;
    gerror: Error | null;
    user: Google.GoogleUser | null;
  };
};