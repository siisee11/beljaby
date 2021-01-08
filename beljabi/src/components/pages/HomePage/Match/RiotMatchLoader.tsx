import React, { useState } from 'react';
import RiotMatchForm from './RiotMatchForm';
import RiotMatchInfoForm from './RiotMatchInfoForm';

import axios from '../../../../axios'
import { message } from 'antd';

export type MatchProps = {
  matchId: string,
};

export type MatchInfo = {
    matchId: string,
    teams: [
        {
            teamId: number,
            win: string,
            baronKills: number,
            dragonKills: number,
            towerKills: number,
            participants: [
                {
                    teamId: number,
                    win: string,
                    champion: string,
                    lane: string,
                    name: string,
                    kills: number,
                    deaths: number,
                    assists: number,
                    firstBloodKill: boolean,
                    firstTowerKill: boolean,
                    visionScore: number,
                    totalCS: number,
                }
            ],
        }   
    ],
}

function RiotMatchLoader() {
  const [ matchInfo, setMatchInfo ] = useState<MatchProps>()
  const onRequestMatch = (match: MatchProps) => {
    axios.get(`/get/matchById?matchId=${match.matchId}`).then((res) => {

      /* create MatchInfo */
      setMatchInfo(res.data);
      message.success('Match retrived.')
    })
  };

  const onSubmitMatch = (match: MatchInfo) => {
    axios.post(`/new/match`, match).then((res) => {
      message.success('Match added.')
    })
  };

  return (
    <>
      { !matchInfo && <RiotMatchForm onRequestMatch={onRequestMatch} /> }
      { matchInfo && <RiotMatchInfoForm onSubmitMatch={onSubmitMatch} matchInfo={matchInfo}/>}
    </>
  );
}

export default RiotMatchLoader;