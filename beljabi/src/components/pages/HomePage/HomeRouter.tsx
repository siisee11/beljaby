import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import Users from "./Users/Users"
import AddUser from "./AddUser/AddUserLoader"
import RiotMatchLoader from "./Match/RiotMatchLoader"
import RiotMatchMakingLoader from "./MatchMaking/RiotMatchMakingLoader"
import MainPage from './MainPage/MainPage'
import MyRooms from './MyRooms/MyRooms';
import { useSelector, useDispatch } from 'react-redux'
import { setUserProfileNullThunk } from "../../../modules/google"
import { setAppUserProfileNullThunk } from "../../../modules/beljabi"
import { syncElo } from '../../../api/beljabi';
import firebase from "firebase/app";
import './HomeRouter.css'

import { Layout, Menu, Popconfirm } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UserAddOutlined,
  TeamOutlined,
  HomeOutlined,
  SyncOutlined,
  LogoutOutlined,
  DeploymentUnitOutlined,
  FireOutlined,
} from '@ant-design/icons';

const { Content, Header, Sider } = Layout;
const { SubMenu } = Menu;

function Home() {
  const [ collapsed, setCollapsed ] = useState<boolean>(true)
  const location = useLocation();
  const dispatch = useDispatch();
  const [isDark, setIsDark] = useState(null);

  useEffect(() => {
    if(document.documentElement.classList.contains("dark")){
      setIsDark(true)
    }
    else {
      setIsDark(false)
    }
  }, [document.documentElement.classList])

  console.log(location)

  const signOut = () => {
    firebase.auth().signOut().then(function() {
        dispatch(setUserProfileNullThunk());
        dispatch(setAppUserProfileNullThunk());
    }).catch(function(error) {
        console.error("firebase signout error")
    });
  }

  const toggle = () => {
      setCollapsed((origin) => !origin)
  }

  const sync = () => {
    syncElo()
  }

  function confirm(e) {
    console.log(e);
  }
  
  function cancel(e) {
    console.log(e);
  }

  return (
    <div className="app">
      <Router>
        <>
          <div className="home__body">
            <Layout>
              <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className={ collapsed ? "logo collapsed" : "logo"} >
                  <img src={ 
                    collapsed ? ( isDark ? "images/Beljabi-mini-white.png" : "images/Beljabi-mini-black.png") : ( isDark ? "images/Beljabi-white.png" : "images/Beljabi-black.png")
                    } alt="BJB" width={ collapsed ? "45" : "100"}/>
              </ div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to='/home' >
                      Home
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2" icon={<TeamOutlined /> }>
                    <Link to='/user' >
                      User
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="3" icon={<DeploymentUnitOutlined />}>
                    <Link to='/match' >
                      Match
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="4" icon={<FireOutlined />}>
                    <Link to='/matchmaking' >
                      Match Making
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="5" icon={<UserAddOutlined />}>
                    <Link to='/adduser' >
                      Add User
                    </Link>
                  </Menu.Item>
              </Menu>
              </Sider>
              <Layout>
                <Layout className="site-layout">
                  <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                      className: 'trigger',
                      onClick: toggle,
                    })}
                    {React.createElement(LogoutOutlined, {
                      className: 'trigger',
                      onClick: signOut,
                    })}
                    <Popconfirm    title="Are you sure to refresh Elo?"
                      onConfirm={sync}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                    {

                      React.createElement(SyncOutlined, {
                        className: 'trigger',
//                        onClick: sync,
                      })
                    }
                    </Popconfirm>
                  </Header>

                  <Content
                    className="site-layout-background"
                    style={{
                      margin: '12px 12px',
                      padding: 24,
                      minHeight: 280,
                    }}
                  >
                    <Switch>
                      <Route exact path={location.pathname} component={MainPage} />
                      <Route exact path={`/user`} component={Users} />
                      <Route exact path={`/match`} component={RiotMatchLoader} />
                      <Route exact path={`/matchmaking`} component={RiotMatchMakingLoader} />
                      <Route exact path={`/adduser`} component={AddUser} />
                      <Route exact path={`/My Rooms`} component={MyRooms} />  {/* 이거없으면깨짐왜?? */}
                    </Switch>
                  </Content>
                </Layout>
              </Layout>
            </Layout>
          </div>
        </>
      </Router>
    </div>
  )
}

export default Home
