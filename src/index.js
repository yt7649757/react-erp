import React from 'react'
import ReactDOM from 'react-dom';
import Routes from './routes/routes'
import { Provider } from 'react-redux';
import { configureStore }  from "./redux/store/configureStore"
const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>,
    document.getElementById('root')
)