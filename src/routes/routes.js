import React, { Component } from 'react';
//使用HashRouter代替了BrowserRouter，因为BrowserRouter在build后需要后端修改服务器的一些配置，否则页面不能显示
import { HashRouter as Router, Route, Switch } from "react-router-dom";
// import App from '../app';
import '../style/app.css'
import { config } from './config'
import PrivateRoute from '../common/privateRoute';

class Routes extends Component {

    render() {
        return(
            <Router>
                <Switch>
                    {config.map((route, index) => (
                        !route.private ? (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.component}
                            />
                        ) : (
                            <PrivateRoute
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.component}
                            />
                            )

                    ))}
                    <Route render={ () => {
                        return (<p>这个页面还在开发中...</p>)
                    } }/>
                </Switch>
            </Router>
        )
    }
}

export default Routes