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
    point: number,
}

const MainPage = () => {
    const { data } = useSelector((state: RootState) => state.beljabi.userProfile);
    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 , delay: 200})
    const [ users, setUsers ] = useState(null)
    const [ tottoRank, setTottoRank ] = useState(null)
    
    useEffect(() => {
        getUserList().then( (res) => {
            res.sort((a: UserListItem, b : UserListItem) => {
                return b.elo - a.elo
            })
            setUsers(res)

            res.sort((a: UserListItem, b : UserListItem) => {
                return b.point - a.point
            })
            setTottoRank(res)
        }) 
    }, [])

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