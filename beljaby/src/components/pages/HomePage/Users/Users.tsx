import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../modules';
import './Users.css'
import {useSpring, animated } from 'react-spring'

import { getUserList } from '../../../../api/beljabi'
import { List, Typography } from 'antd';
import Pusher from "pusher-js"

const pusher = new Pusher('09aca0914798759c73f6', {
    cluster: 'ap3'
});

type UserListItem = {
    gname: string,
    name: string,
    elo: number,
    point: number,
}

const MainPage = () => {
    const { data } = useSelector((state: RootState) => state.beljabi.userProfile);
    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 , delay: 200})
    const [ users, setUsers ] = useState(null)
    const [ tottoRank, setTottoRank ] = useState(null)

    const getUserListInfo = useCallback(async () => {
        const res = await getUserList();
        let copied = JSON.parse(JSON.stringify(res))
        res.sort((a: UserListItem, b : UserListItem) => {
            return b.elo - a.elo
        })
        setUsers(res)

        copied.sort((a: UserListItem, b : UserListItem) => {
            return b.point - a.point
        })
        setTottoRank(copied)
    }, [])

    
    useEffect(() => {
        getUserListInfo();

        //real time stuff...
        const channel = pusher.subscribe('user-channel');
        channel.bind('updateTotto', () => {
            /* Why call this several times?? */
            getUserListInfo()
        });
    }, [getUserListInfo])

    return (
        <>
        { data && users && tottoRank ? 
            (
                <animated.div style={fade}>        
                <div className="UserBoard">
                    <List
                        header={<div>SKKU RANK 👊🏼</div>}
                        bordered
                        dataSource={users}
                        renderItem={(item : UserListItem) => (
                            <List.Item>
                            <Typography.Text strong>[{Math.round(item.elo)}]</Typography.Text> {item.name}
                            </List.Item>
                        )}
                    />
                    <List
                        header={<div>TOTTO RANK 💵</div>}
                        bordered
                        dataSource={tottoRank}
                        renderItem={(item : UserListItem) => (
                            <List.Item>
                            <Typography.Text strong>[{Math.round(item.point)}]</Typography.Text> {item.name} 
                            </List.Item>
                        )}
                    />
                </div>
                </animated.div>
            )  :  (
                null
            )
        }
        </>
    )
}

export default MainPage