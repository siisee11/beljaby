import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import Users from "./Users/Users"
import AddUser from "./AddUser/AddUserLoader"
import RiotMatchLoader from "./Match/RiotMatchLoader"
import RiotMatchHistoryLoader from "./MatchHistory/RiotMatchHistoryLoader"
import RiotMatchMakingLoader from "./MatchMaking/RiotMatchMakingLoader"
import JoinLoader from "./Join/JoinLoader"
import MainPageLoader from './MainPage/MainPageLoader'
import TottoLoader from "./Totto/TottoLoader"
import MyRooms from './MyRooms/MyRooms';
import { useSelector, useDispatch } from 'react-redux'
import { setUserProfileNullThunk } from "../../../modules/google"
import { setAppUserProfileNullThunk } from "../../../modules/beljabi"
import { syncElo } from '../../../api/beljabi';
import firebase from "firebase/app";
import './HomeRouter.css'
import { RootState } from "../../../modules"

import { Layout, Menu, Popconfirm, message } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserAddOutlined,
  TeamOutlined,
  HomeOutlined,
  SyncOutlined,
  LogoutOutlined,
  DeploymentUnitOutlined,
  FireOutlined,
  DollarCircleOutlined,
  HistoryOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

const { Content, Header, Sider } = Layout;

function Home() {
  const { data } = useSelector((state: RootState) => state.beljabi.userProfile);
  const dark = useSelector((state: RootState) => state.dark.dark);
  const [ collapsed, setCollapsed ] = useState<boolean>(false)
  const location = useLocation();
  const dispatch = useDispatch();

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

  const sync = async () => {
    await syncElo()
    message.success('elo recalculated.')
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
                    collapsed ? (dark ? "images/logo/beljaby-mini-white.png" : "images/logo/beljaby-mini.png")
                      : ( dark ? "images/logo/beljaby-white.png"  : "images/logo/beljaby.png" )
                    } alt="BJB" width={ collapsed ? "30" : "170"}/>
              </ div>
              <Menu theme={ dark ? "dark" : "light"} mode="inline" defaultSelectedKeys={['1']}>
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
                  <Menu.Item key="4" icon={<DollarCircleOutlined />}>
                    <Link to='/totto' >
                      Totto
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="5" icon={<ThunderboltOutlined />}>
                    <Link to='/join' >
                      Join Match
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="6" icon={<FireOutlined />}>
                    <Link to='/matchmaking' >
                      Match Making
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="7" icon={<HistoryOutlined />}>
                    <Link to='/history' >
                      Match History
                    </Link>
                  </Menu.Item>
                  {
                    data.isAdmin && (
                      <Menu.Item key="12" icon={<UserAddOutlined />}>
                        <Link to='/adduser' >
                          Add User
                        </Link>
                      </Menu.Item>
                    )
                  }
              </Menu>
              </Sider>


              <Layout>
                <Layout className="site-layout">
                  <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                      className: 'trigger',
                      onClick: toggle,
                    })}
                    <Popconfirm    title="Are you sure to sign out?"
                      onConfirm={signOut}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                    {React.createElement(LogoutOutlined, {
                      className: 'trigger',
//                      onClick: signOut,
                    })}
                    </Popconfirm>
                    {
                      data.isAdmin ? (
                        <>
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
                        </>
                      ) : null
                    }
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
                      <Route exact path={location.pathname} component={MainPageLoader} />
                      <Route exact path={`/user`} component={Users} />
                      <Route exact path={`/match`} component={RiotMatchLoader} />
                      <Route exact path={`/join`} component={JoinLoader} />
                      <Route exact path={`/history`} component={RiotMatchHistoryLoader} />
                      <Route exact path={`/totto`} component={TottoLoader} />
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
