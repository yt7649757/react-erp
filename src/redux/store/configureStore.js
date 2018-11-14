import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { appReducer } from '../reducers/index';
export const configureStore = () => {
     const store = createStore(
         appReducer,
         compose(
             applyMiddleware(thunk, createLogger)
         )
     )
     return store
}

