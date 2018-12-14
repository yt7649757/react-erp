import * as types from '../constants/types';
import axios from '../../utils/checkToken';
import {port} from '../../common/port';

export const getTableList = (url,page = 1,size = 10,status = 1) => {
    return (dispatch,getState) => {
        return axios.get(port + `${url}?page=${page}&per_page=${size}&status=${status}`)
            .then(function (res) {
                const group = getState().table.tableList;
                group[url] = res.data

                console.log(group)

                dispatch({
                    type: types.TABLE_LIST,
                    tableList: group
                });
                return res
            }).catch(error => {
                console.log(error + '请求失败')
            })
    }
}