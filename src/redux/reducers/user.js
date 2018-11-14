import * as types from '../constants/types';

const initialState = {
    access_token: '',
    status: '',
    remember: false,
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
               break
           case types.LOGIN_LOADING:
               return {
                   ...state,
                   status: action.status
               }
               break
           case types.LOGIN_OUT:
                return {
                    ...state,
                    status: action.status
                }
           default:
               return state
       }
}