import React , { useState, useEffect } from 'react'
import "./Login.css";
import styled, {css} from "styled-components"
import firebase from "firebase/app";
import { auth, provider } from "../../../firebase";

import { useSelector, useDispatch } from 'react-redux';
import { setUserProfileThunk } from "../../../modules/google"
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
    const [ isRedirection, setIsRedirection ] = useState(false)

    const signIn = () => {
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    dispatch(setUserProfileThunk(user));
                } else {
                    auth.signInWithRedirect(provider)
                    setIsRedirection(true)
                }
            })
        })
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
        setIsRedirection(true)
        auth.getRedirectResult()
            .then((result) => {
                dispatch(setUserProfileThunk(result.user));
                setIsRedirection(false)
            }).catch((error) => {
                alert(error.message);
                setIsRedirection(false)
            });
    }, [dispatch])

    useEffect(() => {
        console.log("Login user change", user)
        if (user) {
            dispatch(getAppUserProfileThunk(user.email))
        }
    }, [user, dispatch])

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
                !isRedirection && !user && (
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
            {   isRedirection && ( <Spin className="login__spinner" /> )}
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