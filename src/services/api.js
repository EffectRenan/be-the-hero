const axios = require('axios')

const api = axios.create({
    baseURL: 'https://effectrenan-be-the-hero.herokuapp.com/'
})

export default api
