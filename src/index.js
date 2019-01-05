import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/routes';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { configureStore }  from "./redux/store/configureStore";
const store = configureStore()

// function listen () {
//     if (document.readyState === 'complete') { // 资源加载完成
//         ReactDOM.render(
//             <Provider store={store}>
//                 <Routes/>
//             </Provider>,
//             document.getElementById('root')
//         )
//
//     } else { // 资源加载中
//         ReactDOM.render(
//             <Provider store={store}>
//                 <Router>
//                     <Route path="/" component={FirstScreen}/>
//                 </Router>
//             </Provider>,
//             document.getElementById('root')
//         )
//     }
// }
//
// document.onreadystatechange = listen

ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>,
    document.getElementById('root')
)
serviceWorker.unregister();