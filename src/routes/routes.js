import React, { Component } from 'react';
//使用HashRouter代替了BrowserRouter，因为BrowserRouter在build后需要后端修改服务器的一些配置，否则页面不能显示
import { HashRouter as Router, Route, Switch } from "react-router-dom";
// import App from '../app';
import '../style/app.css'
import WrappedNormalLoginForm  from '../login/login'
import PrivateRoute from '../common/privateRoute';
import TableComponent from '../component/tableComponent';
import Page from '../menu/page'

class Routes extends Component {

    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={WrappedNormalLoginForm} />
                    <PrivateRoute exact path="/erp" component={Page} />
                    <PrivateRoute path="/table" component={TableComponent} />
                    <Route render={ () => {
                        return (<p>没有这个页面</p>)
                    } }/>
                </Switch>
            </Router>
        )
    }
}

export default Routes