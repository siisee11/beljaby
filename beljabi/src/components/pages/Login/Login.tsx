import React , { useState, useEffect } from 'react'
import "./Login.css";
import styled, {css} from "styled-components"

import { useSelector, useDispatch } from 'react-redux';
import { getUserProfileThunk } from "../../../modules/google"
import { getAppUserProfileThunk, setAppUserProfileThunk } from "../../../modules/beljabi"
import { RootState } from "../../../modules"

import { Input, Spin } from 'antd';

const Button = styled.a< { primary : boolean } >`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 16rem;
  background: transparent;
  color: white;

  /* The GitHub button is a primary button
   * edit this to target it specifically! */
  ${ (props) => props.primary && css`
    background: #ea4435;
    color: white;
  `}
`

const Login = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.google.userProfile);
    const { data, loading } = useSelector((state: RootState) => state.beljabi.userProfile);
    const [ values, setValues ] = useState({ summonerName: ''})

    const signIn = () => {
        dispatch(getUserProfileThunk());
    };

    const setAppuser = () => {
        dispatch(setAppUserProfileThunk({
            gmail: user.email, 
            gname: user.displayName,
            summonerId: null, 
            accountId: null,
            tier: null,
            name: values.summonerName,
        }))
    }

    useEffect(() => {
        console.log("Login user change")
        if (user) {
            dispatch(getAppUserProfileThunk(user.email))
        }
    }, [user])

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return (
        <div className="login" >
            {/*
            <video autoPlay loop muted id='video'>
                <source src="images/Wall Street Sign.mp4" type='video/mp4'/>
            </video>
            */}
            {
                !user && (
                <div className="TextCard">
                    <h2 className="TextCard__Title">Login to BELJABY🎲</h2>
                    <p className="TextCard__Body">
                        SKKU Soft Elo system
                    </p>
                    <Button
                        className='login__google-btn'
                        onClick={signIn}
                        target="_blank"
                        rel="noopener"
                        primary
                    >
                        Sign in with Google
                    </Button>
                </div>
                )
            }
            {   loading && ( <Spin className="login__spinner" /> )}
            {
                user && !loading && !data && (
                 <div className="TextCard">
                    <h2 className="TextCard__Title">Your Summoner Name</h2>
                    <p className="TextCard__Body">
                        Enter correctly.
                    </p>
                    <Input 
                        id='suoomnerName'
                        type="text" 
                        name="summonerName" 
                        placeholder="키위키위1"
                        value={values.summonerName}
                        onChange={handleChange}
                    />
                    <Button
                        className='login__enter-btn'
                        onClick={setAppuser}
                        target="_blank"
                        rel="noopener"
                        primary
                    >
                        Enter
                    </Button>
                </div>
                )
            }
        </div >
    )
}

export default Login