import axios from 'axios'
const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})
// add token to request

export default api