import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/routes';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { configureStore }  from "./redux/store/configureStore";
const store = configureStore()


ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister();