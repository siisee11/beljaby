import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../modules';
import './Users.css'
import {useSpring, animated } from 'react-spring'

import { getUserList } from '../../../../api/beljabi'
import { List, Typography } from 'antd';

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
                            <Typography.Text strong>[{Math.round(item.elo)}]</Typography.Text> {item.name} - {item.gname}
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