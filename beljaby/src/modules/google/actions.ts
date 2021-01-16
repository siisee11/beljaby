import { AxiosError } from 'axios';
import { createAsyncAction } from "typesafe-actions";
import firebase from 'firebase'

export const GET_USER_PROFILE = 'google/GET_USER_PROFILE';
export const GET_USER_PROFILE_SUCCESS = 'google/GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_ERROR = 'google/GET_USER_PROFILE_ERROR';

export const getUserProfileAsync = createAsyncAction(
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_ERROR
)<undefined, firebase.User | null, AxiosError>();