import { StyleSheet } from 'react-native'

import { baseColor } from '../../../assets/colors'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: baseColor,
        borderWidth: 2,
        borderRadius: 7,
        backgroundColor: 'white',
        width: 180,
        height: 40,
        marginRight: 3,
    },
    registerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        backgroundColor: baseColor,
        width: 180,
        height: 40,
        marginLeft: 3,
    },
    loginText: {
        color: baseColor
    },
    registerText: {
        color: 'white'
    },
    nonmember: {
        marginTop: 20,
        marginBottom: 10,
    },
    nonmemberText: {
        color: '#7D7D7D',
        textDecorationLine: 'underline',

    }
})
export default styles