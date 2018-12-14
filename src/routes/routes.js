import React, { Component } from 'react';
//使用HashRouter代替了BrowserRouter，因为BrowserRouter在build后需要后端修改服务器的一些配置，否则页面不能显示
//cookie不支持file协议,build直接本地打开是不行的
import { HashRouter as Router, Route } from "react-router-dom";
// import App from '../app';
import '../style/app.css'
// import { config } from './config'
// import PrivateRoute from '../common/privateRoute';
import IndexPage from '../common/indexPage'

class Routes extends Component {

    render() {
        return(
            <Router>
                <Route path="/" component={IndexPage}/>
            </Router>
        )
    }
}

export default Routes