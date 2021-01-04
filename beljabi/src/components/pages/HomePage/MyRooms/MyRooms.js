import React, { useState, useEffect } from 'react'
import { useHistory, Link } from "react-router-dom";
import './MyRooms.css'
import { Row, Col, Card, Spin, Menu, Dropdown, Input, Tooltip, Button } from 'antd'
import {useSpring, animated } from 'react-spring'
import { useStateValue } from "../../../../StateProvider";
import "antd/dist/antd.css"

import axios from '../../../../axios'


const MyRooms = ({match}) => {
    const history = useHistory();
    const [{ appuser }] = useStateValue();
    const [classes, setClasses] = useState(null);
    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 })
    const [values, setValues] = useState({
        accessCode: '',
    })

    const menu = (c) => (
        <Menu>
            <Menu.Item>
                <div onClick={e => e.stopPropagation()}>
                    <Link to={`${match.url}/${c.classCode}/${c.semester}/addStudent`} >
                        Add students
                    </Link>
                </div>
            </Menu.Item>
            <Menu.Item>
                <Link to={`${match.url}/addStudent`} >
                    Add students
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to={`${match.url}/addStudent`} >
                    Add students
                </Link>
            </Menu.Item>
            <Menu.Item danger>Delete class</Menu.Item>
        </Menu>
    );

    const getClasses = () => {
        axios.get(`/get/classes?studentId=${appuser.studentId}`).then((res) => {
            setClasses(res.data)
        })
    }

    const enrollClass = () => {
        axios.post(`/new/user/class?studentId=${appuser.studentId}&accessCode=${values.accessCode}`)
        setClasses(null)
        axios.get(`/get/classes?studentId=${appuser.studentId}`).then((res) => {
            setClasses(res.data)
        })
    }

    useEffect(() => {
        getClasses()
    }, [])

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