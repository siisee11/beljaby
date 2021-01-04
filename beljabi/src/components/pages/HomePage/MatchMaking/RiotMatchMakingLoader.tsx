import React, {useState} from 'react';
import RiotMatchMakingForm from './RiotMatchMakingForm';
import RiotMatchMakingInfo from './RiotMatchMakingInfo';
import "./RiotMatchMakingLoader.css"

import axios from '../../../../axios'
import { message, Spin } from 'antd';

function RiotMatchMakingLoader() {
  const [ loading, setLoading ] = useState(false)
  const [ teams, setTeams ] = useState(null)
  const onSubmitMatchMaking = (summoners: object) => {
    setLoading(true)
    axios.post(`/get/matchmaking`, summoners).then((res) => {
      message.success('MatchMaking generated.')
      setTeams(res.data)
      setLoading(false)
    })
  };

  return (
    <>
      { !teams && (<RiotMatchMakingForm onSubmitMatchMaking={onSubmitMatchMaking} />) }
      { loading && (<Spin className="matchmaking__spinner"/>)}
      { teams && (<RiotMatchMakingInfo teams={teams}/> )}
    </>
  );
}

export default RiotMatchMakingLoader;