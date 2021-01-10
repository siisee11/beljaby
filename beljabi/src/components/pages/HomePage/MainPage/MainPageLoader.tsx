import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../modules';
import './MainPage.css'
import { useSpring, animated } from 'react-spring'
import { getSummoner, getCurrentTotto } from "../../../../api/beljabi"
import CurrentMatchInfo from "./CurrentMatchInfo"
import ProfileInfo from "./ProfileInfo"

export type Summoner = {
  _id: string,
  tier: string,
  elo: number,
  summonerId: string,
  accountId: string,
  summonerName: string,
}

const MainPageLoader = () => {
    const { data } = useSelector((state: RootState) => state.beljabi.userProfile);
    const [ summoner, setSummoner ] = useState<Summoner>()
    const [ totto , setTotto ] = useState()
    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 , delay: 200})

    const getSummonerInfo = useCallback( async () => {
        const res = await getSummoner(data.summonerId);
        setSummoner(res);
    }, [data])

    const getCurrentTottoInfo = useCallback(async () => {
       const res = await getCurrentTotto();
       setTotto(res)
    }, [])

    /* If userProfile available, get summoner info */
    useEffect(() => {
        if (data) {
            getSummonerInfo()
        }
        getCurrentTottoInfo()
    }, [data, getSummonerInfo, getCurrentTottoInfo])

    return (
        <animated.div style={fade}>        
            { summoner && <ProfileInfo summoner={summoner} /> }
            { totto && <CurrentMatchInfo totto={totto} /> }
        </animated.div>
    )
}

export default MainPageLoader