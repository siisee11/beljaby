import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { RiotProfile } from '../../api/riot';

export type RiotAction = ActionType<typeof actions>;

export type RiotState = {
  userProfile: {
    loading: boolean;
    error: Error | null;
    data: RiotProfile | null;
  };
};