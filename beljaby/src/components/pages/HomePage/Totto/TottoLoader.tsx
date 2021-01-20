import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from "react-redux"
import { useSpring, animated } from 'react-spring'
import { getCurrentTotto, changeJoin, setCurrentTotto, setCurrentTottoGuess, setCurrentTottoResult, startMatch, finishMatch, Totto } from "../../../../api/beljabi"
import CurrentMatchInfo from "./CurrentMatchInfo"
import TottoInfo from "./TottoInfo"
import TottoForm from "./TottoForm"
import TottoResultForm from "./TottoResultForm"
import Pusher from 'pusher-js'
import { RootState } from "../../../../modules"

import {Button, message, Typography } from "antd"

const { Title } = Typography;

const pusher = new Pusher('09aca0914798759c73f6', {
    cluster: 'ap3'
});

export type TottoGuess = {
    title: string,
    value: string,
    participant: {
        point: number,
        user: string,
    }
}

const TottoLoader = () => {
    const { data } = useSelector((state: RootState) => state.beljabi.userProfile);
    const [ totto , setTotto ] = useState<Totto>()
    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 , delay: 200})

    const getCurrentTottoInfo = useCallback(async () => {
       const res = await getCurrentTotto();
       setTotto(res)
    }, [])

    const onSubmitTotto = (totto: Totto) => {
        setCurrentTotto(totto).then((res) => {
            message.success('Totto added.')
        }).catch((e)=> {
            message.error('Failed.')
        })
    }

    const onSubmitTottoGuess = (totto: TottoGuess) => {
         setCurrentTottoGuess(totto).then((res) => {
            message.success('Totto submited.')
        }).catch((e)=> {
            message.error('Time over.')
        })
    }

    const onSubmitTottoResult = (totto: Totto) => {
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

    const onReroll = () => {
       changeJoin().then(()=>{
            message.success('Match Changed.')
       }).catch(()=>{
           message.error('Failed')
       }); 
    }

    /* If userProfile available, get summoner info */
    useEffect(() => {
        /* /get/currentTotto */
        getCurrentTottoInfo()

        //real time stuff...
        const channel = pusher.subscribe('totto-channel');
        channel.bind('newTotto', () => {
            /* Why call this several times?? */
            getCurrentTottoInfo()
        });
        channel.bind('updateTotto', () => {
            /* Why call this several times?? */
            getCurrentTottoInfo()
        });

        return () => {
            channel.unbind('newTotto')
            channel.unbind('updateTotto')
        }
    }, [getCurrentTottoInfo])

    return (
        <animated.div style={fade}>        
            { totto && (
                <>
                <CurrentMatchInfo totto={totto} /> 
                <TottoInfo totto={totto} onSubmitTottoGuess={onSubmitTottoGuess}/>
                <TottoResultForm onSubmitTottoResult={onSubmitTottoResult}/>
                </>
                )
            }
            { data.isAdmin &&  <TottoForm onSubmitTotto={onSubmitTotto}/> }
            { data.isAdmin && (
                <div style={{display:"flex", flexDirection:"row"}}>
                    <Button onClick={onReroll}>Reroll match</Button>
                    <Button onClick={onStartMatch}>Start match</Button>
                    <Button onClick={onFinishMatch}>Finish match</Button>
                </div>
                )
            }
            { !totto && (<Title level={3}> No Match Found... </Title>) }

        </animated.div>
    )
}

export default TottoLoader