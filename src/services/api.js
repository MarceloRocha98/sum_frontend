import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000', // URL de DESENVOLVIMENTO
})

const success = res => res
const error = err => {

    if (401 === err.response.status) {
        window.location = '/Signin'
        // location.assign('/')
    } else {

        return Promise.reject(err)
    }
}

axios.interceptors.response.use(success, error);

export default api;