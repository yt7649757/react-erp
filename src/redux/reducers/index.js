import { combineReducers } from 'redux';
import { user } from './user';
import { systemManage } from './system/systemManage';
import { agora } from "./agora/agora";

export const appReducer = combineReducers({
    user: user,
    systemManage,
    agora,
});