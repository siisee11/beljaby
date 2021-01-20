import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://beljaby.herokuapp.com'
})

export default instance