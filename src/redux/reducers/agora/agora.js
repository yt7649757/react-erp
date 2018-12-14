import * as types from '../../constants/types';

const initialState = {
    selectGroup: {},
    tableList: [],
    payment: [],
    partment: [],
    useLessList: [],
    projectInfo: []
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
        case types.PROJECT_INFO:
            return {
                ...state,
                projectInfo: action.projectInfo
            }
        default:
            return state
    }
}