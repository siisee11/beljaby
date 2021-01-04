import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../modules';
import './MainPage.css'
import { useSpring, animated } from 'react-spring'
import { getSummoner } from "../../../../api/beljabi"

const MainPage = () => {
    const { data } = useSelector((state: RootState) => state.beljabi.userProfile);
    const [ summoner, setSummoner ] = useState(null)
    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 , delay: 200})

    const getSummonerInfo = () => {
        getSummoner(data.summonerId).then( (res) => {
            setSummoner(res);
        })
    }

    useEffect(() => {
        if (data) {
            console.log("data", data)
            getSummonerInfo()
        }
    }, [data])

    const eloToTier  = () : string => {
        let localTier = ''
        // Tier to Elo
        if (summoner.elo <= 1100 ){
            localTier = "BRONZE" 
        } else if (summoner.elo <= 1300) {
            localTier = "SILVER" 
        } else if (summoner.elo <= 1500) {
            localTier = "GOLD" 
        } else if (summoner.elo <= 1700) {
            localTier = "PLATINUM" 
        } else if (summoner.elo <= 1900) {
            localTier = "DIAMOND" 
        } else {
            localTier = "TIE CHUNG"
        }
        return localTier
    }

    return (
        <>
        { data && summoner ? 
            (
                <animated.div style={fade}>        
                    <div className='mainpage__container'>
                        <div className="TextCard">
                            <h2 className="TextCard__Title">You are {data.name}</h2>
                            <p className="TextCard__Body">
                                Solo rank Tier: {summoner.tier}
                            </p>
                            <p className="TextCard__Body">
                                SKKU rank Tier: {eloToTier()}
                            </p>
                            <p className="TextCard__Body">
                                SKKU Elo : {Math.round(summoner.elo)}
                            </p>
                        </div>
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