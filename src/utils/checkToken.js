import axios from 'axios';
import cookie from 'react-cookies';
import { message } from 'antd';
import { createHashHistory } from 'history';

window.lock = false;
axios.interceptors.request.use(
    config => {
        const token = cookie.load('access_token')
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
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

