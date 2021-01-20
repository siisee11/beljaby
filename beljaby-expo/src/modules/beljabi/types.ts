import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { BeljabiProfile } from '../../api/beljabi';

export type BeljabiAction = ActionType<typeof actions>;

export type BeljabiState = {
  userProfile: {
    loading: boolean;
    error: Error | null;
    data: BeljabiProfile | null;
  };
};