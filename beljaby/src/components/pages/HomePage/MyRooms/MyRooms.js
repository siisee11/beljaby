import React, { useState } from 'react'
import './MyRooms.css'
import { Spin, Input, Button } from 'antd'
import {useSpring, animated } from 'react-spring'
import "antd/dist/antd.css"

const MyRooms = () => {
    const [classes, setClasses] = useState(null);
    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 })
    const [values, setValues] = useState({
        accessCode: '',
    })

    const enrollClass = () => {
        setClasses(null)
    }

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return (
        <animated.div style={fade} className='myroom__container'>
            <div className='myroom__enroll'>
                <h1> Enter class access code to enroll.</h1>
                <Input
                    id='accessCode'
                    type="text" 
                    name="accessCode" 
                    placeholder="Access code" 
                    value={values.accessCode}
                    onChange={handleChange}
                />
                <Button 
                    onClick={enrollClass} 
                    >
                    Enroll
                </Button>
            </div>
            { 
                !classes ? (
                    <div className="example">
                        <Spin />
                    </div>
                ) : null
            }               
        </animated.div>
    )
}

export default MyRooms 