import { combineReducers } from 'redux';
import { user } from './user';
import { systemManage } from './system/systemManage';
import { agora } from "./agora/agora";
import { table } from "./table";
import { queto } from './queto/queto';
import { finance } from "./finance/finance";

export const appReducer = combineReducers({
    user: user,
    systemManage,
    agora,
    table,
    queto,
    finance
});