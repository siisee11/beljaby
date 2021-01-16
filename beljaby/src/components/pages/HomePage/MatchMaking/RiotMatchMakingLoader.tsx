import React, {useState} from 'react';
import RiotMatchMakingForm from './RiotMatchMakingForm';
import RiotMatchMakingInfo from './RiotMatchMakingInfo';
import "./RiotMatchMakingLoader.css"
import { RiotMatchMakingInfoProps } from "../../../../api/beljabi"

import axios from '../../../../axios'
import { message, Spin } from 'antd';

function RiotMatchMakingLoader() {
  const [ loading, setLoading ] = useState(false)
  const [ teams, setTeams ] = useState<RiotMatchMakingInfoProps>(null)

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
      { !teams && !loading && (<RiotMatchMakingForm onSubmitMatchMaking={onSubmitMatchMaking} />) }
      { loading && (<Spin className="matchmaking__spinner"/>)}
      { teams && (<RiotMatchMakingInfo teams={teams.teams} elos={teams.elos} wps={teams.wps}/> )}
    </>
  );
}

export default RiotMatchMakingLoader;