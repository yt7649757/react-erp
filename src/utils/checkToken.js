import axios from 'axios';
import cookie from 'react-cookies';
import  message from '../common/message';
import { createHashHistory } from 'history';
// import Qs from 'qs';
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [obj => Qs.stringify(obj)]

window.lock = false;

axios.interceptors.request.use(
    config => {
        if(!window.navigator.onLine) {
            message.error('请检查你的网络状态')
        }
        const token = cookie.load('access_token')
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        // if (config.method === 'post') {
        //     config.data = Qs.stringify(config.data)
        // }
        return config
    },
    error => {
        return Promise.resolve(error);
    })


axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                if(!window.lock && window.location.hash !== '#/') {
                    window.lock = true
                    sessionStorage.clear()
                    message.error('你的身份已过期，请重新登录');
                    cookie.remove('access_token')
                    cookie.remove('userInfo')
                    setTimeout( () => createHashHistory().replace('/'), 2000)
                }
            }
        }
    })

export default axios

