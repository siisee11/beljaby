import React from 'react';
import { useSpring, animated } from 'react-spring'
import './RiotMatchMakingInfo.css';

import { Typography } from 'antd';

type Summoner = {
  _id: string,
  tier: string,
  elo: number,
  summonerId: string,
  accountId: string,
  summonerName: string,
}

type RiotMatchMakingInfoProps = {
  teams: Array<Array<Summoner>>;
};

const { Title } = Typography;

function RiotMatchMakingInfo({ teams }: RiotMatchMakingInfoProps) {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 , delay: 200})

  const eloToTier  = (elo: number) : string => {
    let localTier = ''
    // Tier to Elo
    if (elo <= 1100 ){
        localTier = "BRONZE" 
    } else if (elo <= 1300) {
        localTier = "SILVER" 
    } else if (elo <= 1500) {
        localTier = "GOLD" 
    } else if (elo <= 1700) {
        localTier = "PLATINUM" 
    } else if (elo <= 1900) {
        localTier = "DIAMOND" 
    } else {
        localTier = "TIE CHUNG"
    }
    return localTier
  }

  return (
    <animated.div style={fade}>        
      <div className="RiotMatchMakingInfo">
        <div className="RiotMatchMakingInfo__team">
        {
          teams[0].map((player) => {
            return (
            <div className="TextCard">
              <h2 className="TextCard__Title">{player.summonerName}</h2>
              <p className="TextCard__Body">
                  SKKU rank Tier: {eloToTier(player.elo)}
              </p>
              <p className="TextCard__Body">
                  SKKU Elo : {Math.round(player.elo)}
              </p>
            </div>
            )
          })
        }
      </div>
      <Title style={{alignSelf:"center", margin: "70px"}}> VS </Title>
      <div className="RiotMatchMakingInfo__team">
        {
          teams[1].map((player) => {
            return (
            <div className="TextCard">
              <h2 className="TextCard__Title">{player.summonerName}</h2>
              <p className="TextCard__Body">
                  SKKU rank Tier: {eloToTier(player.elo)}
              </p>
              <p className="TextCard__Body">
                  SKKU Elo : {Math.round(player.elo)}
              </p>
            </div>
            )
          })
        }
      </div>
    </div >
    </animated.div>
  );
}

export default RiotMatchMakingInfo;