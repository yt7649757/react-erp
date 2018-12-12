import * as types from '../../constants/types';
import {port} from '../../../common/port'
import axios from '../../../utils/checkToken'


export const getSelects = (params) => {
    return (dispatch, getState) => {
        return axios.get(port + `/api/erp/index/getfieldjson/${params}`)
            .then(function (res) {
                const group = getState().agora.selectGroup;
                group[params] = res.data[params]
                dispatch({
                    type: types.SELECT_GROUP,
                    selectGroup: group
                })
                return Promise.resolve('success')
            }).catch(error => {
                console.log(error + '获取用户信息失败')
            })
    }
}


export const addProject = (params) => {
    return dispatch => {
        return axios.post(port + `/api/erp/project/addprojectentry`, {
            ...params
        }).then(function (res) {
            return Promise.resolve(res)
        })
    }
}

//我的业务

export const getTables = (page= 1, size = 15, status = 1) => {
    return (dispatch) => {
        return axios.get(port + '/api/erp/project/showprojectuserlist?page=' + page + '&per_page=' + size + '&status=' + status)
            .then(function (res) {
                dispatch({
                    type: types.TABLE_RENDER,
                    tableList: res.data
                });
                return Promise.resolve(res)
            }).catch(error => {
                console.log(error + '请求失败')
            })
    }
}


//获取定金单支付方式
export const getPayment = () => {
    return (dispatch) => {
        axios.get(port + '/api/erp/project_deposit/showpaystylejson')
            .then(function (res) {
                console.log(res)
                dispatch({
                    type: types.PAY_MENT,
                    payment: res.data
                });
            }).catch(error => {
                console.log(error + '请求失败')
            })
    }
}

//添加定金单
export const addPaymentForm = (url, params) => {
    return dispatch => {
        return axios.post(port + url, {
            ...params
        }).then(function (res) {
            return res.data
        }).catch(error => {
            return error
        })
    }
}

//添加废单
export const addUselessForm = (url, params) => {
    return dispatch => {
        return axios.post(port + url, {
            apply_type: params.apply_type,
            apply_desc: params.apply_desc
        }).then(function (res) {
            return res.data
        }).catch(error => {
            console.log(error + '请求失败')
        })
    }
}

//编辑
export const editRow = (url, params) => {
    return dispatch => {
        return axios.put(port + url, {
            ...params
        }).then(function (res) {
            return res.data
        }).catch(error => {
            return error
        })
    }
}

//添加附件

export const addField = (url, params) => {
    return dispatch => {
        return axios.post(port + url, {
            ...params
        }).then(function (res) {
            console.log(res);
            return res.data
        }).catch(error => {
            console.log(error + '请求失败')
        })
    }
}


//删除

export const deleteProject = (params) => {
    return dispatch => {
        return axios.delete(port + '/api/erp/project/delproject', {
            params: params
        }).then(function (res) {
            console.log(res);
            return res.data
        }).catch(error => {
            console.log(error + '请求失败')
        })
    }
}