import { RiotProfile } from '../../api/riot';
import { AxiosError } from 'axios';
import { createAsyncAction } from "typesafe-actions";

export const GET_USER_PROFILE = 'riot/GET_USER_PROFILE';
export const GET_USER_PROFILE_SUCCESS = 'riot/GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_ERROR = 'riot/GET_USER_PROFILE_ERROR';

export const getUserProfileAsync = createAsyncAction(
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_ERROR
  )<undefined, RiotProfile, AxiosError>();