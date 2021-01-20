import React, { useEffect, useState } from 'react'
import './ProfileInfo.css'
import { useSpring, animated } from 'react-spring'

type ProfileInfoProps = {
  summoner: Summoner,
  splash: string,
};

const MainPage = ({ summoner, splash }: ProfileInfoProps) => {
    const [ localInfo, setLocalInfo ] = useState<string[]>([])
    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 , delay: 200})

    useEffect(() => {
        if (summoner) {
            setLocalInfo(eloToTier(summoner.elo))
        }
    }, [summoner])

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
        <>
        {
            localInfo ? (
                <animated.div style={fade}>        

                    <div className='mainpage__container' id="parent">
                        <img
                            src={splash}
                            alt="champion"
                            id='splash'
                            />
                        <div className='mainpage__profile'>
                            <img src={localInfo[2]} alt="base"
                                style={{width:"80px", margin:"0px 0px -35px", zIndex:3}} 
                            />
                            <div className="TextCard" style={{zIndex:2}}>
                                <h2 className="TextCard__Title">{summoner.summonerName}</h2>
                                <p className="TextCard__Body">
                                    Solo rank Tier: {summoner.tier}
                                </p>
                                <p className="TextCard__Body">
                                    SKKU rank Tier: {localInfo[0]}
                                </p>
                                <p className="TextCard__Body">
                                    SKKU Elo : {Math.round(summoner.elo)}
                                </p>
                            </div>
                            <img src={localInfo[1]} alt="trim"
                                style={{width:"350px", margin:"-105px 0 0 0", zIndex:2}} 
                            />
                        </div>
                    </div>
                </animated.div>
            ) : null
        }
        </>
    )
}

export default MainPage