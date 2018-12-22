import axios from 'axios';
import cookie from 'react-cookies';
import { message } from 'antd';
import { createHashHistory } from 'history';

window.lock = false;
// http response 拦截器

// axios每次请求接口都会发送两次请求，而且第一次请求看不到参数，相当于是options请求（这里请求的接口是跨域）
// IE9不支持CORS，跨域header带不过去
axios.interceptors.request.use(
    config => {
        const token = cookie.load('access_token')
        if (token) {
            // config.headers.Authorization = 'Bearer11' + token;  //token无效
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config
    },
    error => {
        return Promise.resolve(error);//请求错误时，不会直接结束，将会继续传到then里面,无论请求成功还是失败，在成功的回调中都能收到通知
    })


axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:        //token过期，应该refresh token， 或者直接就跳转到登录界面  （这里还没有实现该功能）
                // 这里跳转登陆
                if(!window.lock) {
                    window.lock = true  //首页进入会同时发出多个请求，这里限制一下，让提示信息只出现一次
                    sessionStorage.clear()
                    message.error('你的身份已过期，请重新登录');
                    cookie.remove('access_token')  //模拟cookie过期
                    cookie.remove('userInfo')
                    setTimeout( () => createHashHistory().replace('/'), 2000)
                }
            }
        }
    })

export default axios

