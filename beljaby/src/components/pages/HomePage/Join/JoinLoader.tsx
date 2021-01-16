import React, {useState, useEffect } from 'react';
import JoinForm from './JoinForm';
import JoinInfo from './JoinInfo';
import { useHistory } from "react-router-dom"
import "./JoinLoader.css"
import { getJoin, setJoinSummoner } from "../../../../api/beljabi"
import { message, Spin } from 'antd';
import Pusher from "pusher-js"

const pusher = new Pusher('09aca0914798759c73f6', {
    cluster: 'ap3'
});

function JoinLoader() {
  const history = useHistory();
  const [ join, setJoin ] = useState();
  const [ joined, setJoined] = useState<boolean>(false);
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
        /* Why call this several times?? */
        history.push(`/totto`)
    });
  }, [history])

  return (
    <div className="JoinLoader">
        {
          loading ? (
            <Spin size="large" />
          ) : (
            <div className="TextCard" >
              <h2 className="TextCard__Title" style={{marginBottom:"20px"}}>Join Current Match!</h2>
              { join && (<JoinInfo summoners={join.summoners}/> )}
              { !joined && (<JoinForm onSubmitJoin={onSubmitJoin} />) }
            </div>
          )
        }
    </div>
  );
}

export default JoinLoader;