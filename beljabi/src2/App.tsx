import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import HomeRouter from './components/pages/HomePage/HomeRouter'
import Login from './components/pages/Login/Login'
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { RootState } from './modules';

/* Theme */
import "react-toggle/style.css";
import { DarkToggle } from "./components/common/darkToggle"

/* Styles */
import "./styles/_index.scss";

const StyledApp = styled.div``;

const App: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.google.userProfile);

  return (
    <StyledApp>
      <div className="app">
        <Router>
            { !user && <Login /> }
            { user && (
              <>
                <Switch>
                  <Redirect exact path="/" to="/home" />
                  <Route exact path='/home' component={HomeRouter} />
                  <Redirect path="*" to="/home" />
                </Switch>
              </>
            )}
        </Router>
        <DarkToggle />
      </div>
    </StyledApp>
  );
}

export default App;