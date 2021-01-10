import React, { useEffect, useState, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import { getCurrentTotto, setCurrentTotto, setCurrentTottoGuess, setCurrentTottoResult, startMatch, finishMatch } from "../../../../api/beljabi"
import CurrentMatchInfo from "./CurrentMatchInfo"
import TottoInfo from "./TottoInfo"
import TottoForm from "./TottoForm"
import TottoResultForm from "./TottoResultForm"

import {Button, message} from "antd"

export type Summoner = {
  _id: string,
  tier: string,
  elo: number,
  summonerId: string,
  accountId: string,
  summonerName: string,
}

const MainPageLoader = () => {
    const [ totto , setTotto ] = useState()
    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 , delay: 200})

    const getCurrentTottoInfo = useCallback(async () => {
       const res = await getCurrentTotto();
       setTotto(res)
    }, [])

    const onSubmitTotto = (totto: object) => {
        setCurrentTotto(totto).then((res) => {
            message.success('Totto added.')
        }).catch((e)=> {
            message.error('Failed.')
        })
    }

    const onSubmitTottoGuess = (totto: object) => {
         setCurrentTottoGuess(totto).then((res) => {
            message.success('Totto submited.')
        }).catch((e)=> {
            message.error('Failed.')
        })
    }

    const onSubmitTottoResult = (totto: object) => {
        setCurrentTottoResult(totto).then((res) => {
            message.success('Totto added.')
        }).catch((e)=> {
            message.error('Failed.')
        })
    }

    const onStartMatch = () => {
       startMatch().then(()=>{
            message.success('Start Match.')
       }).catch(()=>{
           message.error('Failed')
       }); 
    }

    const onFinishMatch = () => {
       finishMatch().then(()=>{
            message.success('Finish Match.')
       }).catch(()=>{
           message.error('Failed')
       }); 
    }

    /* If userProfile available, get summoner info */
    useEffect(() => {
        getCurrentTottoInfo()
    }, [getCurrentTottoInfo])

    return (
        <animated.div style={fade}>        
            { totto && <CurrentMatchInfo totto={totto} /> }
            { totto && <TottoInfo totto={totto} onSubmitTottoGuess={onSubmitTottoGuess}/>}
            <TottoForm onSubmitTotto={onSubmitTotto}/>
            <TottoResultForm onSubmitTottoResult={onSubmitTottoResult}/>
            <div style={{display:"flex", flexDirection:"row"}}>
                <Button onClick={onStartMatch}>Start match</Button>
                <Button onClick={onFinishMatch}>Finish match</Button>
            </div>
        </animated.div>
    )
}

export default MainPageLoader