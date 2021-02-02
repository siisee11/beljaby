import React, { memo, useState, useEffect, useCallback } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { Navigation } from '../types';
import { getJoin, setJoinSummoner } from "../api/beljabi"
import Pusher from 'pusher-js/react-native';

const pusher = new Pusher('09aca0914798759c73f6', {
    cluster: 'ap3'
});

type Props = {
  navigation: Navigation;
};

const JoinScreen = ({navigation}: Props) => {
  const [ join, setJoin ] = useState();
  const [ joined, setJoined] = useState<boolean>(false)
  const [ loading, setLoading ] = useState<boolean>(true);

  const onSubmitJoin = (summoner: string) => {
    setJoinSummoner({ summoner: summoner}).then(() => {
      setJoined(true)
      message.success('Joined.')
    }).catch(e => {
      message.error('Failed!')
    })
  }

  const onChangeJoin = () => {
    setLoading(true)
    getJoin().then((data) => {
      setJoin(data);
      setLoading(false)
    }).catch(err => {
      setLoading(false)
    })
  }

  useEffect(() => {
    onChangeJoin();
    //real time stuff...
    const channel = pusher.subscribe('join-channel');
    channel.bind('newJoin', () => {
        /* Why call this several times?? */
        onChangeJoin()
    });
    channel.bind('updateJoin', () => {
        /* Why call this several times?? */
        onChangeJoin()
    });

    //real time stuff...
    const tottoChannel = pusher.subscribe('totto-channel');
    tottoChannel.bind('newTotto', () => {
        history.push(`/totto`)
    });

    return () => {
      channel.unbind("newJoin")
      channel.unbind("updateJoin")
      tottoChannel.unbind("newTotto")
    }
  }, [history])

  return (
    <Background>
      <Paragraph>Join Game</Paragraph>
      <Button icon="account-plus" mode="contained" onPress={() => console.log('Pressed')}>
        Join!
      </Button>
    </Background>
  );
}

export default memo(JoinScreen);
