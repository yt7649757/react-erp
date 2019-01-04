import * as types from '../constants/types';

const initialState = {
    access_token: '',
    status: '',
    remember: false,
    userInfo: null,
    sidebarData: [],
    rootSubmenuKeys: [],
    updatePas: '',
    onlineUser: [],
    userWorks: [],
    companyMessage: []
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
           case types.ONLINE_USER:
               return {
                   ...state,
                   onlineUser: action.onlineUser
               }
           case types.USER_WORKS:
               return {
                   ...state,
                   userWorks: action.userWorks
               }
           case types.COMPAYN_MESSAGE:
               return {
                   ...state,
                   companyMessage: action.companyMessage
               }
           default:
               return state
       }
}