import React from 'react'
import "./Login.css";
import styled, {css} from "styled-components"

import { useSelector, useDispatch } from 'react-redux';
import { getUserProfileThunk } from "../../../modules/google"

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

    const signIn = () => {
        dispatch(getUserProfileThunk());
    };

    return (
        <div className="login" >
            {/*
            <video autoPlay loop muted id='video'>
                <source src="images/Wall Street Sign.mp4" type='video/mp4'/>
            </video>
            */}
            <img id='video' src="images/League-of-Legends.jpg"></img>
            <div className="TextCard">
                <h2 className="TextCard__Title">Login to BELJABI🌱</h2>
                <p className="TextCard__Body">
                    ELO
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
        </div >
    )
}

export default Login