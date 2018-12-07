import * as types from '../../constants/types';

const initialState = {
    selectGroup: {},
    tableList: [],
    payment: [],
}

export const agora = (state = initialState, action) => {
    switch (action.type) {
        case types.SELECT_GROUP:
            return {
                ...state,
                selectGroup: action.selectGroup
            }
        case types.TABLE_RENDER:
            return {
                ...state,
                tableList: action.tableList
            }
        case types.PAY_MENT:
            return {
                ...state,
                payment: action.payment
            }
        default:
            return state
    }
}