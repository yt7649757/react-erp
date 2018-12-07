import * as types from '../../constants/types';

const initialState = {
    userLoginList: [],
    roleList: [],
    roleTree: [],
    checkedTree: [],
    treeId: '',
    nodeList: []
}

export const systemManage = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_LOGINLIST:
            return {
                ...state,
                userLoginList: action.userLoginList
            }
        case types.ROLE_LIST:
            return {
                ...state,
                roleList: action.roleList
            }
        case types.ROLE_TREE:
            return {
                ...state,
                roleTree: action.roleTree
            }
        case types.CHECKED_TREE:
            return {
                ...state,
                checkedTree: action.checkedTree
            }
        case types.TREE_ID:
            return {
                ...state,
                treeId: action.treeId
            }
        case types.NODE_LIST:
            return {
                ...state,
                nodeList: action.nodeList
            }
        default:
            return state
    }
}