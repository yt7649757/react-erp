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