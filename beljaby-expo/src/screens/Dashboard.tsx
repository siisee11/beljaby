import React, { memo, useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { Navigation } from '../types';
import { setUserProfileNullThunk } from "../modules/google"
import { setAppUserProfileNullThunk } from "../modules/beljabi"
import { RootState } from "../modules"
import { getSummoner, getCurrentTotto, Summoner } from "../api/beljabi"
import { theme } from "../core/theme"

type Props = {
  navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const { data, loading } = useSelector((state: RootState) => state.beljabi.userProfile);
  const [ summoner, setSummoner ] = useState<Summoner>()

  const getSummonerInfo = useCallback( async () => {
    const res = await getSummoner(data.summonerId);
    setSummoner(res);
  }, [data])


  const onSignOut = async () => {
    dispatch(setUserProfileNullThunk());
    dispatch(setAppUserProfileNullThunk());
    navigation.navigate('HomeScreen')
  }

  useEffect(() => {
    if (data) {
        getSummonerInfo()
    }
  })

  return (
    <Background>
      <Logo />
      <Header>Hi, {data?.name}</Header>
      <Paragraph>Your elo is {Math.round(summoner?.elo)}</Paragraph>
    </Background>
  );
}
export default memo(Dashboard);
