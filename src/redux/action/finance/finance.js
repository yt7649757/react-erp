import * as types from '../../constants/types';
import {port} from '../../../common/port';
import axios from '../../../utils/checkToken';

export const getTableList = (params) => {
    return dispatch => {
      return axios.get(port + '/api/erp/finance/showpaymentlist')
            .then(function (res) {
                dispatch({
                    type: types.PAYMENT_LIST,
                    paymentList: res.data
                })
                return res.data
            }).catch(err => {
            alert(err)
        })
    }
}

export const getProjectProgress = (params) => {
    return dispatch => {
      return  axios.get(port + params.url, {
            params : {
                page: params.page,
                per_page: params.size
            }
        }).then(res => {
           dispatch({
               type: types.PROJECT_PROGRESS,
               projectProgress: res.data
           })
           return res
        })
    }
}