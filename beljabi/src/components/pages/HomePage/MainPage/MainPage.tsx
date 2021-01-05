import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../modules';
import './MainPage.css'
import { useSpring, animated } from 'react-spring'
import { getSummoner } from "../../../../api/beljabi"

const MainPage = () => {
    const { data } = useSelector((state: RootState) => state.beljabi.userProfile);
    const [ summoner, setSummoner ] = useState(null)
    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 , delay: 200})
    const [ localTier , setLocalTier ] = useState(null)
    const [ localTierTrim , setLocalTierTrim ] = useState(null)
    const [ localTierImg , setLocalTierImg ] = useState(null)

    const getSummonerInfo = useCallback( async () => {
        const res = await getSummoner(data.summonerId);
        setSummoner(res);
    }, [data])

    useEffect(() => {
        if (data) {
            getSummonerInfo()
        }
    }, [data, getSummonerInfo])

    useEffect(() => {
        if (summoner) {
            eloToTier(summoner.elo)
        }
    }, [summoner])

    const eloToTier  = (elo : number) => {
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

        setLocalTier(localTier)
        setLocalTierTrim(localTierTrim)
        setLocalTierImg(localTierImg)
    }

    return (
        <>
        { data && summoner && localTier && localTierImg ? 
            (
                <animated.div style={fade}>        
                    <div className='mainpage__container'>
                        <img src={localTierImg} alt="base"
                            style={{width:"80px", margin:"0 0 -36px", zIndex:2}} 
                        />
                        <div className="TextCard">
                            <h2 className="TextCard__Title">You are {data.name}</h2>
                            <p className="TextCard__Body">
                                Solo rank Tier: {summoner.tier}
                            </p>
                            <p className="TextCard__Body">
                                SKKU rank Tier: {localTier}
                            </p>
                            <p className="TextCard__Body">
                                SKKU Elo : {Math.round(summoner.elo)}
                            </p>
                        </div>
                        <img src={localTierTrim} alt="trim"
                            style={{width:"350px", margin:"-105px 0 0 0"}} 
                        />
                    </div>
                </animated.div>
            )  :  (
                null
            )
        }
        </>
    )
}

export default MainPage