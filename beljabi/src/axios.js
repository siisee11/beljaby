import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://beljabi.herokuapp.com'
})

export default instance