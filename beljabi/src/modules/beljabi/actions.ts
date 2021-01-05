import { BeljabiProfile } from '../../api/beljabi';
import { AxiosError } from 'axios';
import { createAsyncAction } from "typesafe-actions";

export const GET_USER_PROFILE = 'beljabi/GET_USER_PROFILE';
export const GET_USER_PROFILE_SUCCESS = 'beljabi/GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_ERROR = 'beljabi/GET_USER_PROFILE_ERROR';

export const getUserProfileAsync = createAsyncAction(
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_ERROR
)<undefined, BeljabiProfile, AxiosError>();
