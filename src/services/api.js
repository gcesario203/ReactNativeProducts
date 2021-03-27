import axios from 'axios'

const api = axios.create({
    baseURL: 'https://nodejs-produtos.herokuapp.com'
})

export default api