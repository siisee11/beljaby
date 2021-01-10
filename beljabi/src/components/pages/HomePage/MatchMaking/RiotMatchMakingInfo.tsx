import React from 'react';
import { useSpring, animated } from 'react-spring'
import './RiotMatchMakingInfo.css';
import { RiotMatchMakingInfoProps, setMatchMaking } from "../../../../api/beljabi"

import { Typography, Button, message } from 'antd';

const { Title } = Typography;

function RiotMatchMakingInfo({ teams, elos, wps}: RiotMatchMakingInfoProps) {
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

  const onFinish = () => {
    let match = { teams: teams, elos: elos, wps: wps}
    setMatchMaking(match).then( (res) => {
      console.log(res)
      message.success("current match setted.")
    }).catch((err)=> {
      message.error("current match failed.")
    })
  }

  return (
    <>
        <animated.div style={fade}>        
          <div className="RiotMatchMakingInfo">
            <div className="RiotMatchMakingInfo__team">
            {
              teams[0].map((player) => {
                let localInfo = eloToTier(player.elo)
                return (
                  <div className="player">
                    <div className="TextCard">
                      <h2 className="TextCard__Title">{player.summonerName}</h2>
                      <p className="TextCard__Body">
                          SKKU Elo : {Math.round(player.elo)}
                      </p>
                    </div>
                    <img src={localInfo[2]} alt="base"
                        style={{width:"80px", height:"80px", margin:"40px 0px 0px -40px", zIndex:2}} 
                    />
                  </div>
                )
              })
            }
            <Title level={3} style={{alignSelf:"center", margin: "50px"}}> TEAM Elo : {Math.round(elos[0])} </Title>
            <Title level={3} style={{alignSelf:"center", margin: "50px"}}> Win Persentage : {wps[0]} </Title>
            
          </div>
          <Title className= "vs-divider" style={{alignSelf:"center", margin: "70px 100px 70px 70px"}}> VS </Title>
          <div className="RiotMatchMakingInfo__team">
            {
              teams[1].map((player) => {
                let localInfo = eloToTier(player.elo)
                return (
                  <div className="player">
                    <div className="TextCard">
                      <h2 className="TextCard__Title">{player.summonerName}</h2>
                      <p className="TextCard__Body">
                          SKKU Elo : {Math.round(player.elo)}
                      </p>

                    </div>
                    <img src={localInfo[2]} alt="base"
                        style={{width:"80px", height:"80px", margin:"40px 0px 0px -380px", zIndex:2}} 
                    />
                  </div>
                )
              })
            }
            <Title level={3} style={{alignSelf:"center", margin: "50px"}}> TEAM Elo : {Math.round(elos[1])} </Title>
            <Title level={3} style={{alignSelf:"center", margin: "50px"}}> Win Persentage : {wps[1]} </Title>
          </div>
          <Button
            onClick={onFinish}
          >
            Submit
          </Button>
        </div >
        </animated.div>
  </>
  );
}

export default RiotMatchMakingInfo;