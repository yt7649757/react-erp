import * as types from '../../constants/types';
import axios from '../../../utils/checkToken';
import {port} from '../../../common/port';

//获取用户登录情况
export const getUserLogin = (page, size) => {
    return (dispatch) => {
        return axios.get(port + '/api/erp/system/messagelist?page=' + page + '&per_page=' + size)
            .then(function (res) {
                dispatch({
                    type: types.USER_LOGINLIST,
                    userLoginList: res.data
                });
                return res
            }).catch(error => {
                console.log(error + '请求失败')
            })
    }
}


//角色管理

export const getRoleList = (page, size, status) => {
    return (dispatch) => {
        return axios.get(port + '/api/erp/system/rolelist?page=' + page + '&per_page=' + size + '&status=' + status)
            .then(function (res) {
                dispatch({
                    type: types.ROLE_LIST,
                    roleList: res.data
                });
                return res
            }).catch(error => {
                console.log(error + '请求失败')
            })
    }
}

//添加角色

export const addRole = (params) => {
    return (dispatch) => {
        return axios.put(port + '/api/erp/system/roleedit', {
            ...params
        })
            .then(function (res) {
                return Promise.resolve(res.data)
            })
            .catch(function (error) {
                console.log('出错了' + error)
            });
    }
}

//删除

export const deleteRole = (params) => {
    return (dispatch) => {
        return axios.delete(port + '/api/erp/system/roleedit', {
            params: params
        })
            .then(function (res) {
                return Promise.resolve(res.data)
            })
            .catch(function (error) {
                console.log('出错了' + error)
            });
    }
}


//编辑
export const editRole = (params) => {
    return (dispatch) => {
        return axios.put(port + '/api/erp/system/roleedit', {
            ...params
        })
            .then(function (res) {
                return Promise.resolve(res.data)
            })
            .catch(function (error) {
                console.log('出错了' + error)
            });
    }
}

//获取权限树

export const getTreeList = (url) => {
    return dispatch => {
        return axios.get(port + url)
            .then(function (res) {
                dispatch({
                    type: types.ROLE_TREE,
                    roleTree: res.data
                })
                return Promise.resolve('ok')
            }).catch(error => {
                return Promise.reject(error)
            })
    }
}

//获取选中的权限
export const getCheckedTree = (url) => {
    return dispatch => {
        axios.get(port + '/api' + url)
            .then(function (res) {
                dispatch({
                    type: types.CHECKED_TREE,
                    checkedTree: res.data
                })
            }).catch(error => {
            console.log(error + '请求失败')
        })
    }
}


//修改权限
export const updateRoleTree = (url, params) => {
    return (dispatch) => {
        return axios.post(port + '/api' + url, {
            ...params
        })
            .then(function (res) {
                return Promise.resolve(res.data)
            })
            .catch(function (error) {
                console.log('出错了' + error)
            });
    }
}

//菜单管理列表

export const getNodeList = (page, size, status) => {
    return (dispatch) => {
        return axios.get(port + '/api/erp/system/nodelist?page=' + page + '&per_page=' + size + '&status=' + status)
            .then(function (res) {
                dispatch({
                    type: types.NODE_LIST,
                    nodeList: res.data
                });
                return res
            }).catch(error => {
                console.log(error + '请求失败')
            })
    }
}

//添加

export const addNode = (params) => {
    return (dispatch) => {
        return axios.put(port + '/api/erp/system/nodeedit', {
            ...params
        })
            .then(function (res) {
                // return Promise.resolve(res.data)
                return res.data
            })
            .catch(function (error) {
                console.log('出错了' + error)
            });
    }
}

//修改
export const editNode = (params) => {
    return (dispatch) => {
        return axios.put(port + '/api/erp/system/nodeedit', {
            ...params
        })
            .then(function (res) {
                return Promise.resolve(res.data)
            })
            .catch(function (error) {
                console.log('出错了' + error)
            });
    }
}

// export const deleteNode = (params) => {
//     return (dispatch) => {
//         return axios.delete(port + '/api/erp/system/nodeedit', {
//             params: params
//         })
//             .then(function (res) {
//                 return Promise.resolve(res.data)
//             })
//             .catch(function (error) {
//                 console.log('出错了' + error)
//             });
//     }
// }

export const deleteNode = (params) => (dispatch) =>
    //如果箭头后有{ }，则{}内有return 则返回return后的值，没有 则返回undefined
    /**
     *   1.const fun1 = ()=>1+2 //执行后结果 3
         2. const fun2 = () => {1+2} //执行后结果 undefined
         3. const fun3 = () => {return 1+2 } // 执行后结果 3
     * @param dispatch
     */
        axios.delete(port + '/api/erp/system/nodeedit', {
            params: params
        }).then(function (res) {
           return Promise.resolve(res.data)
        }).catch(function (error) {
            console.log('出错了' + error)
        });
