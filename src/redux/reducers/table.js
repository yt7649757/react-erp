import * as types from '../constants/types';

const initialState = {
    tableList: {}
}


export const table = (state = initialState, action) => {
    switch (action.type) {
        case types.TABLE_LIST:
          return {
              ...state,
              tableList: action.tableList
          }
        default:
           return state
    }
}