import React from 'react';
import './RiotMatchHistoryInfoForm.css';
import { Match } from "../../../../api/beljabi"
import { Typography } from 'antd';

const { Title } = Typography;

type RiotMatchHistoryInfoFormProps = {
  matchHistoryInfo: Array<Match>;
};

function RiotMatchHistoryInfoForm({ matchHistoryInfo }: RiotMatchHistoryInfoFormProps) {

  const generateMatch = (matchInfo: Match) => {
    console.log("matchInfo", matchInfo)
    return (
      <div className="TextCard Match">
      <Title level={5}>MatchHistoryId : {matchInfo.matchId} </Title>
      {
        matchInfo["teams"].map((team, i) => {
          return (
            <div className="Team">
            <Title level={3}>{team["win"] === "Win" ? "Win" : "Defeat" }</Title>
            <Title level={5}>
              Baron: {team["baronKills"]} / Dragon: {team["dragonKills"]} / Tower: {team["towerKills"]}
            </Title>
            {
              team["participants"].map((participant, j) => {
                return(
                <div className="participant">
                  <Title level={5} style={{alignSelf: "center"}}>
                    {participant.name} : {participant.champion} - {participant.lane} - 
                    ({participant.kills} / {participant.deaths} / {participant.assists} / {participant.totalCS})
                  </Title>
                </div>
                )
              })
            }
            </div>
          )
        })
      }
      </div>
    )
  }

  return (
    <div className="RiotMatchHistoryInfoForm">
      {
        matchHistoryInfo.map((matchInfo) => {
          return (
            generateMatch(matchInfo)
          )
        })
     }
    </div>
  )
}

export default RiotMatchHistoryInfoForm;