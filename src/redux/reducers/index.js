import { combineReducers } from 'redux';
import { user } from './user';

export const appReducer = combineReducers({
      user: user
})