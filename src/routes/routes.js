import React, {Component} from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from '../common/privateRoute';
import Template from '../common/template';
import {config} from '../routes/config';
import WrappedNormalLoginForm from '../login/login';
import Auth from '../common/auth';
import '../style/app.css';

const _route = Auth(Route)
class Routes extends Component {

    test = () => {
        const r = config.map((item,index) => (
            item.children ? (
                item.children.map((subItem, index) =>
                    (
                        <PrivateRoute key={index} path={subItem.path} component={subItem.component}/>
                    )
                )
            ): (
                <PrivateRoute key={index} exact={item.exact} path={item.path} component={item.component} />
            )
        ))
        return r
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={WrappedNormalLoginForm} />
                    <_route path="/erp" render={(props) => (
                        <Template {...props}>
                            {this.test()}
                        </Template>
                    )}/>
                </Switch>
            </Router>
        )
    }
}

export default Routes