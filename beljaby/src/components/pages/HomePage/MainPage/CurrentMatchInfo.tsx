import React from 'react';
import { useSpring, animated } from 'react-spring'
import './CurrentMatchInfo.css';
import { Totto } from "../../../../api/beljabi"

import { Typography } from 'antd';



type CurrentMatchInfoProps = {
  totto: Totto,
};

const { Title } = Typography;

function CurrentMatchInfo({ totto }: CurrentMatchInfoProps) {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 , delay: 200})

  const eloToTier  = (elo : number) : Array<string> => {
      let localTier = ''
      let localTierTrim = ''
      let localTierImg = ''
      // Tier to Elo
      if (elo <= 1100 ){
          localTier = "BRONZE" 
          localTierTrim = "images/trim_bronze.png"
          localTierImg = "images/base-icons/bronze.png"
      } else if (elo <= 1300) {
          localTier = "SILVER" 
          localTierTrim = "images/trim_silver.png"
          localTierImg = "images/base-icons/silver.png"
      } else if (elo <= 1500) {
          localTier = "GOLD" 
          localTierTrim = "images/trim_gold.png"
          localTierImg = "images/base-icons/gold.png"
      } else if (elo <= 1700) {
          localTier = "PLATINUM" 
          localTierTrim = "images/trim_plat.png"
          localTierImg = "images/base-icons/platinum.png"
      } else if (elo <= 1900) {
          localTier = "DIAMOND" 
          localTierImg = "images/base-icons/diamond.png"
      } else {
          localTier = "TIE CHUNG"
      }

      return [localTier, localTierTrim, localTierImg]
  }

  return (
    <animated.div style={fade}>        
      <div className="CurrentMatchInfo">
        <Title className= "divider" style={{alignSelf:"center", margin: "30px 0px 30px 0px"}}> Current Match </Title>
        <div className="CurrentMatchInfo__team">
          {
            totto.match.teams[0].map((player) => {
              let localInfo = eloToTier(player.elo)
              return (
                <div className="player">
                  <div className="TextCard" style={{padding:"5px", margin:"10px"}}>
                    <h2 className="TextCard__Title" style={{fontSize:"1rem"}}>{player.summonerName}</h2>
                    <p className="TextCard__Body">
                        SKKU Elo : {Math.round(player.elo)}
                    </p>
                    <img src={localInfo[2]} alt="base"
                        style={{width:"40px", height:"40px", zIndex:2}} 
                    />
                  </div>
                </div>
              )
            })
          }
        </div>
        <Title level={3} style={{alignSelf:"center", margin: "5px"}}> TEAM Elo : {Math.round(totto.match.elos[0])} </Title>
        <Title level={3} style={{alignSelf:"center", margin: "5px"}}> Win Persentage : {Math.round(totto.match.wps[0])} </Title>
        <Title style={{alignSelf:"center", margin: "30px"}}> VS </Title>
        <div className="CurrentMatchInfo__team">
          {
            totto.match.teams[1].map((player) => {
              let localInfo = eloToTier(player.elo)
              return (
                <div className="player">
                  <div className="TextCard" style={{padding:"5px", margin:"10px"}}>
                    <h2 className="TextCard__Title" style={{fontSize:"1rem"}}>{player.summonerName}</h2>
                    <p className="TextCard__Body">
                        SKKU Elo : {Math.round(player.elo)}
                    </p>
                    <img src={localInfo[2]} alt="base"
                        style={{width:"40px", height:"40px", zIndex:2}} 
                    />
                  </div>
                </div>
              )
            })
          }
      </div>
      <Title level={3} style={{alignSelf:"center", margin: "5px"}}> TEAM Elo : {Math.round(totto.match.elos[1])} </Title>
      <Title level={3} style={{alignSelf:"center", margin: "5px"}}> Win Persentage : {Math.round(totto.match.wps[1])} </Title>
    </div >
    </animated.div>
  );
}

export default CurrentMatchInfo;