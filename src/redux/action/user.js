import * as types from '../constants/types';
import axios from 'axios';
import {port} from '../../common/port'
import { message } from 'antd'

export const login = (username, password, remember) => {
    return (dispatch) => {
            dispatch({
                type: types.LOGIN_LOADING,
                status: 'loading'
            })
            axios.post(port + 'api/auth/login', {
                username: username,
                password: password
            })
            .then(function (res) {
                if(res.data.access_token) {
                    message.info('登录成功', 1)
                    dispatch({
                        type: types.USER_LOGIN,
                        status: 'success',
                        data: res.data.access_token,
                        remember: remember
                    })
                }
            })
            .catch(function (error) {
                message.info('用户名或密码错误', 1)
                dispatch({
                    type: types.LOGIN_LOADING,
                    status: ''
                })
                console.log('请求错误' + error)
            });
    }
}

export const loginOut = () => {
     return (dispatch) => {
         dispatch({
             type: types.LOGIN_OUT,
             status: 'exit'
         })
     }
}