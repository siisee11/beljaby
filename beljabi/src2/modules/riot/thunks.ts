import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { RiotAction } from './types';
import { getUserProfile } from '../../api/riot';
import { getUserProfileAsync } from './actions';

export function getUserProfileThunk(username: string): ThunkAction<void, RootState, null, RiotAction> {
  return async dispatch => {
    const { request, success, failure } = getUserProfileAsync;
    dispatch(request());
    try {
      const userProfile = await getUserProfile(username);
      dispatch(success(userProfile));
    } catch (e) {
      dispatch(failure(e));
    }
  };
}