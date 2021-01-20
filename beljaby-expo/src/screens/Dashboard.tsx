import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { Navigation } from '../types';
import { setUserProfileNullThunk } from "../modules/google"
import { setAppUserProfileNullThunk } from "../modules/beljabi"

type Props = {
  navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => {
  const dispatch = useDispatch()

  const onSignOut = async () => {
    dispatch(setUserProfileNullThunk());
    dispatch(setAppUserProfileNullThunk());
    navigation.navigate('HomeScreen')
  }

  return (
    <Background>
      <Logo />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favourite code editor and start
        editing this project.
      </Paragraph>
      <Button mode="outlined" onPress={onSignOut}>
        Logout
      </Button>
    </Background>
  );
}
export default memo(Dashboard);
