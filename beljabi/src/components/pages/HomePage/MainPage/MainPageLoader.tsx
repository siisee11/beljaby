import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../modules';
import './MainPage.css'
import { useSpring, animated } from 'react-spring'
import { getSummoner } from "../../../../api/beljabi"
import CurrentMatchInfo from "./CurrentMatchInfo"
import ProfileInfo from "./ProfileInfo"

const MainPageLoader = () => {
    const { data } = useSelector((state: RootState) => state.beljabi.userProfile);
    const [ summoner, setSummoner ] = useState(null)
    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 , delay: 200})

    const teamData = [[{"tier":"PLATINUM","elo":1631.78979416438,"_id":"5ff1d3abfb3af300179100ac","summonerId":"I2Nzz1Qyd3zc4bypIrRnbuAbrzhocEMoe26trX3bwFHkPwo","accountId":"PbHv_CcDFqFpnngDhwa9yEeHNw2cMcxqF1-RZv7H2UiJD9s","summonerName":"원추링","__v":0},{"tier":"SILVER","elo":1259.8192721043051,"_id":"5ff1d3fcfb3af300179100ad","summonerId":"fyfvROujabr0A_r0j3TGeYw-BXztPgDsL7Z6GZBIWIg7ga8","accountId":"bcASVVIidAgymm4azbXzFZ-wxcD2ADvB3KqUSdiboLPs","summonerName":"옥산동 제어와드","__v":0},{"tier":"SILVER","elo":1219.0979912438054,"_id":"5ff1cd5d7cf77100179999e4","summonerId":"U76BjmEBGIdxhjCTZ-t2WU_-8prYBe9nVhsuRsF6_nm3kqM","accountId":"Cg9frG7gHUfsEBfWml1ZqxDrqWH0EOut8EBkPoHtbUcsoFoOJ4w11C7z","summonerName":"키위키위1","__v":0},{"tier":"BRONZE","elo":990.0584898977655,"_id":"5ff1d454fb3af300179100b1","summonerId":"2bVJBwArDqIHLdhcIbV_Q3LPcoTXUYNTk7l-Yc131Y8nbuY","accountId":"8NZXZEpuWdsEbk4HKTVZsHfLyH9i_sQl8bZ3zQjnFHasebGHnn4C6NFd","summonerName":"HTMLProgrammer","__v":0},{"tier":"UNRANK","elo":943.1270135316303,"_id":"5ff1d44afb3af300179100b0","summonerId":"UH-o4TZvvQEwdzvXs8ghG0jbNzZlaG49A5IUydGPVfWM9Z0","accountId":"wAAHxjqBooimMKgUbpqUQ_dYhnc9WY8srxejsJpMOmGTjK4","summonerName":"Bloris","__v":0}],[{"tier":"PLATINUM","elo":1571.9723297831224,"_id":"5ff1d434fb3af300179100af","summonerId":"YrNIq6nxUaiKMr7wpYjYmQuxr-n_xf528sGDr-oTsWBfbQ","accountId":"Ahdk0Zewa3J-xy-n-UumjPMsgf5uIZsK4dGFhoX4x1gT","summonerName":"K Rimi","__v":0},{"tier":"PLATINUM","elo":1501.8670737444288,"_id":"5ff1d45efb3af300179100b2","summonerId":"W6_btAAYnFOD4f_3ZxkKiRpgCyKgAaO4DShQKf_dDEJQWw","accountId":"BiBbGAGkArrB-n0RLN901s7ftsUe9ZsYgEm3pLvdXuI7","summonerName":"장뚝봬기","__v":0},{"tier":"UNRANK","elo":998.0631504382845,"_id":"5ff1d637719a72001749dab8","summonerId":"yDGn_LwWi1dWG22rp4eQb7PXyFpTDQIfUC9KYqq68CGfDTE","accountId":"GesXMo5XeKq02Owwu_HbX8qptuohrntjUug6FfTsMPd9Pd0","summonerName":"선혈포식자누르기","__v":0},{"tier":"BRONZE","elo":992.7499280282717,"_id":"5ff1d468fb3af300179100b3","summonerId":"84ygLBAw4y54xmNlQKHfYZhFZ2fQG1Xqy2ltj5QXUOae-78","accountId":"NxqqHW_i9-uCQJdr2rvtZ7vKl8P5ge05n23Oax7Ihbsw9K6lQRMMhnQm","summonerName":"홍태하","__v":0},{"tier":"UNRANK","elo":964.3879426781315,"_id":"5ff1d407fb3af300179100ae","summonerId":"w7-kg6zo2ys_U7JVSanychE8zrfPQa5UDRyzxD-MRWfUnO4","accountId":"qqFEYvF4g5Q00oWUQS6Jq4FT59_bHdxexUWdPVIYqBPOAxioYM8wpXGI","summonerName":"능금능금1","__v":0}]];

    const getSummonerInfo = useCallback( async () => {
        const res = await getSummoner(data.summonerId);
        setSummoner(res);
    }, [data])

    useEffect(() => {
        if (data) {
            getSummonerInfo()
        }
    }, [data, getSummonerInfo])

    return (
        <animated.div style={fade}>        
            <ProfileInfo summoner={summoner} />
            <CurrentMatchInfo teams={teamData} />        
        </animated.div>
    )
}

export default MainPageLoader