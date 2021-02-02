import React, { memo, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { Navigation } from '../types';
import * as Google from 'expo-google-app-auth';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfileThunk } from "../modules/google"
import { getAppUserProfileThunk } from "../modules/beljabi"
import { RootState } from "../modules"

type Props = {
  navigation: Navigation;
};

const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.google.userProfile);
  const { data, loading } = useSelector((state: RootState) => state.beljabi.userProfile);

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        iosClientId: "976254185383-mjue5vlbt4ihvlq2fcu9e33o57jnfdtg.apps.googleusercontent.com",
        //androidClientId: AND_CLIENT_ID,
        scopes: ['profile', 'email'],
      });
      console.log(result)

      if (result.type === 'success') {
        dispatch(setUserProfileThunk(result.user));
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  const signInWithGoogle = () => {
    signInWithGoogleAsync()
  }

  useEffect(() => {
    console.log("Login user change", user)
    if (user) {
        dispatch(getAppUserProfileThunk(user.email))
    } 
  }, [user, dispatch])

  useEffect(() => {
    if (data) {
      navigation.navigate('HomeRouter');
    }
  }, [data])

  return (
    <Background>
      <Logo />
      <Header>BELJABY</Header>

      <Paragraph>
        Custom Team Matching
      </Paragraph>
      <Button mode="contained" onPress={() => signInWithGoogle()}>
        Sign in with Google
      </Button>
    </Background>
  );
}

export default memo(LoginScreen);
