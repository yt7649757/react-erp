import * as types from '../../constants/types';

const initialState = {
    selectGroup: {},
    tableList: [],
    payment: [],
    partment: [],
    useLessList: []
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
        case types.PART_MENT:
            return {
                ...state,
                partment: action.partment
            }
        case types.USELESS_LIST:
            return {
                ...state,
                useLessList: action.useLessList
            }
        default:
            return state
    }
}