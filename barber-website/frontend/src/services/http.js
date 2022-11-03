import axios from 'axios'
const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})
// add token on request
api.interceptors.request.use(function (config) {

    // read token from session storage
    const json = sessionStorage.getItem("vuex")
    const { token } = JSON.parse(json)

    //set
    config.headers.Authorization = 'Bearer ' + token;
    return config;
});
export default api