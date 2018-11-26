import * as types from '../../constants/types'
import axios from '../../../utils/checkToken'
import {port} from '../../../common/port'

//获取用户登录情况
export const getUserLogin = (page,size) => {
    return (dispatch) => {
        axios.get(port + '/api/erp/system/messagelist?page='+ page + '&per_page=' + size)
            .then(function (res) {
                dispatch({
                    type: types.USER_LOGINLIST,
                    userLoginList: res.data
                })
            }).catch(error => {
            console.log(error + '获取用户信息失败')
        })
    }
}


