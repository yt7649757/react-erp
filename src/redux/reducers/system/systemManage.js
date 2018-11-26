import * as types from '../../constants/types';

const initialState = {
    userLoginList: []
}

export const systemManage = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_LOGINLIST:
            return {
                ...state,
                userLoginList: action.userLoginList
            }
        default:
            return state
    }
}