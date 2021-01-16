import React, { useState, useEffect } from 'react';
import RiotMatchHistoryInfoForm from './RiotMatchHistoryInfoForm';
import { Match, getMatchList } from "../../../../api/beljabi"
import { message } from 'antd';

function RiotMatchHistoryLoader() {
  const [ matchInfo, setMatchInfo ] = useState<Array<Match>>()

  const onRequestMatch = () => {
    getMatchList().then((res) => {
      /* create MatchInfo */
      setMatchInfo(res);
      message.success('Match retrived.')
    })
  };

  useEffect(() => {
    onRequestMatch()
  }, [])

  return (
    <>
      { matchInfo && <RiotMatchHistoryInfoForm matchHistoryInfo={matchInfo}/>}
    </>
  );
}

export default RiotMatchHistoryLoader;