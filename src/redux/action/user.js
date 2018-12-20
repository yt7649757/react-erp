import * as types from '../constants/types';
// import axios from 'axios';
import cookie from 'react-cookies';
import {port} from '../../common/port'
import { message } from 'antd'
import axios  from '../../utils/checkToken'

// const token = cookie.load('access_token')
//全局设置请求头(在请求头中携带token,这样下面的请求url无需写token了)
// axios.defaults.headers.common['Authorization'] = 'Bearer' + token;

export const login = (username, password, remember) => {
    return (dispatch) => {
            dispatch({
                type: types.LOGIN_LOADING,
                status: 'loading'
            })
           return  axios.post(port + '/api/auth/login', {
                username: username,
                password: password
            })
            .then(function (res) {
                if(res.data.access_token) {
                    message.info('登录成功', 1)
                    dispatch({
                        type: types.USER_LOGIN,
                        status: 'success',
                        data: res.data,
                        remember: remember
                    })
                    return Promise.resolve(res.data)
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
         return axios.get(port + '/api/auth/logout')
             .then(function (res) {
                 dispatch({
                     type: types.LOGIN_OUT,
                     status: 'exit'
                 })
                 return Promise.resolve(res)
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
           return axios.put(port + '/api/erp/system/setpersonnelpassword', {
                password: pas,
                new_password: newpas,
                new_password_confirmation: newpas1
            })
            .then(function (res) {
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
        // const token = cookie.load('access_token')
        // http://localhost:3000/sider.json
        axios.get( port + '/api/erp/index/getmenujson')
            .then(function (res) {
                res.data.unshift({
                    menu_id: "cccc123",
                    icon: "./static/icon.png",
                    menu_name: " 首页",
                    pid: "12313123",
                    url: "erp",
                    closable: false
                })
                var rootSubmenuKeys =res.data.map(item => item.menu_id)
                dispatch({
                    type: types.GET_SIDER,
                    sidebarData: res.data,
                    rootSubmenuKeys: rootSubmenuKeys
                })
            }).catch(error => {
            console.log(error + '请求失败!')
        })
    }
}

export const onlineUser = (page,size) => {
    return(dispatch) => {
        axios.get(port + '/api/erp/index/getuseronline?page=' + page + '&per_page=' + size)
            .then(function (res) {
                dispatch({
                    type: types.ONLINE_USER,
                    onlineUser: res.data.data
                })
                return res
            }).catch(error => {
            console.log(error + '获取用户信息失败')
        })
    }
}

export const getUserWork = () => {
    return(dispatch) => {
        axios.get(port + '/api/erp/index/getuserwork')
            .then(function (res) {
                dispatch({
                    type: types.USER_WORKS,
                    userWorks: res
                })
            }).catch(error => {
            console.log(error + '获取失败')
        })
    }
}


export const getMessage = () => {
    return(dispatch) => {
        axios.get('./static/news.json')
            .then(function (res) {
              dispatch({
                  type: types.COMPAYN_MESSAGE,
                  companyMessage: res.data
              })
            }).catch(error => {
            console.log(error + '获取失败')
        })
    }
}

