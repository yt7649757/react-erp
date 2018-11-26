import { combineReducers } from 'redux';
import { user } from './user';
import { systemManage } from './system/systemManage';

export const appReducer = combineReducers({
    user: user,
    systemManage,
});