import * as types from  '../../constants/types';

const initialState = {
    paymentList: [],
    projectProgress: []
}

export const finance = (state = initialState, action) => {
    switch (action.type) {
        case types.PAYMENT_LIST:
            return {
                ...state,
                paymentList: action.paymentList
            }
        case types.PROJECT_PROGRESS:
            return {
                ...state,
                projectProgress: action.projectProgress
            }
        default:
            return state
    }
}