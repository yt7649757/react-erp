import * as types from '../constants/types';

//页面刷新redux的初始状态
const initialState = {
    access_token: '',
    status: '',
    remember: false,
    userInfo: null,
    sidebarData: [],
    rootSubmenuKeys: [],
    updatePas: ''
}

export const user = (state = initialState, action) => {
       switch (action.type) {
           case types.USER_LOGIN:
               return {
                   ...state,
                   access_token: action.data,
                   status: action.status,
                   remember: action.remember
               }
           case types.LOGIN_LOADING:
               return {
                   ...state,
                   status: action.status
               }
           case types.LOGIN_OUT:
                return {
                    ...state,
                    status: action.status
                }
           case types.UPDATE_PAS:
               return {
                   ...state,
                   updatePas: action.updatePas
               }
           case types.USER_INFO:
               return {
                   ...state,
                   userInfo: action.userInfo
               }
           case types.GET_SIDER:
               return {
                   ...state,
                   sidebarData: action.sidebarData,
                   rootSubmenuKeys: action.rootSubmenuKeys
               }
           default:
               return state
       }
}