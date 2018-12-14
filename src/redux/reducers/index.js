import { combineReducers } from 'redux';
import { user } from './user';
import { systemManage } from './system/systemManage';
import { agora } from "./agora/agora";
import { table } from "./table";

export const appReducer = combineReducers({
    user: user,
    systemManage,
    agora,
    table,
});