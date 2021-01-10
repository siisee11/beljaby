import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import styles from './styles'
// import NoticeCarousel from '../../Components/NoticeCarousel'

const StartScreen = ({ navigation }) => {
    const [images, setImages] = useState([
        require('../../../assets/LoginPost/img/img0.jpg'),
        require('../../../assets/LoginPost/img/img1.jpg'),
        require('../../../assets/LoginPost/img/img2.jpg'),
        require('../../../assets/LoginPost/img/img3.jpg'),
        require('../../../assets/LoginPost/img/img4.png'),
    ])
    return (
        <View style={styles.container}>
            {/* <NoticeCarousel datas={images} /> */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginButton} >
                    <Text style={styles.loginText}>로그인</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton} >
                    <Text style={styles.registerText}>회원가입</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.nonmember} >
                <Text style={styles.nonmemberText}>비회원으로 둘러보기</Text>
            </TouchableOpacity>
        </View>
    )
}
export default StartScreen