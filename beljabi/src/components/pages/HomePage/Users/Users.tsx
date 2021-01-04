import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../modules';
import './Users.css'
import {useSpring, animated } from 'react-spring'

import { getUserList } from '../../../../api/beljabi'
import Button from "../../../common/Button/Button"
import { List, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const data1 = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

type UserListItem = {
    gname: string,
    name: string,
    elo: number,
}

const MainPage = () => {
    const { data } = useSelector((state: RootState) => state.beljabi.userProfile);
    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 , delay: 200})
    const [ users, setUsers ] = useState(null)
    
    useEffect(() => {
        getUserList().then( (res) => {
            res.sort((a: UserListItem, b : UserListItem) => {
                return b.elo - a.elo
            })
            setUsers(res)
        }) 
    }, [])

    return (
        <>
        { data && users ? 
            (
                <animated.div style={fade}>        
                    <List
                        header={<div>SKKU RANK 👊🏼</div>}
                        bordered
                        dataSource={users}
                        renderItem={(item : UserListItem) => (
                            <List.Item>
                            <Typography.Text mark>[{Math.round(item.elo)}]</Typography.Text> {item.name} - {item.gname}
                            </List.Item>
                        )}
                    />
                </animated.div>
            )  :  (
                null
            )
        }
        </>
    )
}

export default MainPage