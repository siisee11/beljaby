import React from 'react'
import './MainPage.css'
import {useSpring, animated } from 'react-spring'

import Button from "../../../common/Button/Button"
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const MainPage = () => {
    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 , delay: 500})

    return (
        <animated.div style={fade}>        
            <div className='mainpage__container .darkBg'>
                <div className="mainpage_statistic-card">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card 
                                bordered={false}>
                            <Statistic
                                title="Active"
                                value={11.28}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="%"
                            />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card
                                bordered={false}
                                className='mainpage__card'>
                            <Statistic
                                title="Idle"
                                value={9.3}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="%"
                            />
                            </Card>
                        </Col>
                    </Row>
                </div>
                <Button
                    color="pink"
                >
                    Load Currency
                </Button>
            </div>
        </animated.div>
    )
}

export default MainPage