import * as types from  '../../constants/types';

const initialState = {
    paymentList: []
}

export const finance = (state = initialState, action) => {
    switch (action.type) {
        case types.PAYMENT_LIST:
            return {
                ...state,
                paymentList: action.paymentList
            }
        default:
            return state
    }
}