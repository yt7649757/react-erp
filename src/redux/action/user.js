import * as types from '../constants/types';
import axios from 'axios';
import cookie from 'react-cookies';
import {port} from '../../common/port'
import { message } from 'antd'

const token = cookie.load('access_token')
//全局设置请求头(在请求头中携带token,这样下面的请求url无需写token了)
axios.defaults.headers.common['Authorization'] = 'Bearer' + token;

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


export const getUserInfo = () => {
    return (dispatch) => {
        axios.get(port + '/api/auth/me')
            .then(function (res) {
                dispatch({
                    type: types.USER_INFO,
                    userInfo: res.data
                })
                cookie.save('userInfo', res.data)
            }).catch(error => {
                console.log(error + '获取用户信息失败')
        })
    }
}

export const updatePas = (pas,newpas,newpas1) => {
    //直接返回,无需传入reducer
    return (dispatch) => {
           return axios.put(port + 'api/erp/system/setpersonnelpassword', {
                password: pas,
                new_password: newpas,
                new_password_confirmation: newpas1
            })
            .then(function (res) {
                console.log(res)
                // dispatch({
                //     type: types.UPDATE_PAS,
                //     updatePas: res.data.status,
                // })
                // console.log(res)
                return res.data
            })
            .catch(function (error) {
                //错误信息 error.response
                message.info(error.response.data.errors.password[0])
                console.log('出错了' + error)
            });
    }
}


export const getSider = () => {
    return (dispatch) => {
        const token = cookie.load('access_token')
        axios.get(port + 'api/erp/index/getmenujson?token='+ token )
            .then(function (res) {
                res.data.unshift({
                    menu_id: "index001",
                    icon: "",
                    menu_name: "首页",
                    pid: "0",
                    url: "erp"
                })
                var rootSubmenuKeys =res.data.map(item => item.menu_id)
                dispatch({
                    type: types.GET_SIDER,
                    sidebarData: res.data,
                    rootSubmenuKeys: rootSubmenuKeys
                })
            }).catch(error => {
            alert('error' + '请求失败!')
        })
    }
}