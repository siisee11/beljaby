import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import RiotProfileLoader from "./ProfilePage/RiotProfileLoader"
import MainPage from './MainPage/MainPage'
import { useSelector, useDispatch } from 'react-redux'
import { setUserProfileNullThunk } from "../../../modules/google"
import firebase from "firebase/app";
import './HomeRouter.css'

import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Content, Header, Sider } = Layout;
const { SubMenu } = Menu;

function Home() {
  const [ collapsed, setCollapsed ] = useState<boolean>(true)
  const location = useLocation();
  const dispatch = useDispatch();

  const signOut = () => {
      firebase.auth().signOut().then(function() {
          dispatch(setUserProfileNullThunk());
      }).catch(function(error) {
          console.error("firebase signout error")
      });
  }

  const toggle = () => {
      setCollapsed((origin) => !origin)
  }

  return (
      <Router>
        <>
          <div className="home__body">
            <Layout>
              <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className={ collapsed ? "logo collapsed" : "logo"} >
                  <img src={ collapsed ? "images/ults-notitle.png" : "images/riot-games-logo.png"} alt="logo"/>
              </ div>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                  <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to='/home' >
                      Home
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2" icon={<UserOutlined />}>
                    <Link to='/user' >
                      User
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="3" icon={<UserOutlined />}>
                    <Link to='/matches' >
                      Matches
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
                      <Route path={`/user`} component={RiotProfileLoader} />
                    </Switch>
                  </Content>
                </Layout>
              </Layout>
            </Layout>
          </div>
        </>
      </Router>
  )
}

export default Home
