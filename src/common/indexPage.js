import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { config } from '../routes/config'
import PrivateRoute from '../common/privateRoute';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

class IndexPage extends Component {

    componentDidMount() {
        this.updateTitle(this.props);
    }

    componentWillUpdate(nextProps) {
        if(this.props.location !== nextProps.location) {
            this.updateTitle(nextProps);
        }
    }

    updateTitle = (props) => {
        //当前pathname
    }


    render() {
        return(
            <LocaleProvider locale={zh_CN}>
                <div>
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
                            route.children && route.children.length >0 ? (
                                route.children.map((subRoute,index) => {
                                    return (
                                        <PrivateRoute
                                            key={index}
                                            path={subRoute.path}
                                            exact={subRoute.exact}
                                            component={subRoute.component}
                                            replace
                                        />
                                    )
                                })
                            ): (
                                <PrivateRoute
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.component}
                                    replace
                                />
                            )
                        )

                    ))}
                    <Route render={ () => {
                        return (<p>这个页面还在开发中...</p>)
                    } }/>
                </Switch>
            </div>
            </LocaleProvider>
        )
    }
}

export default IndexPage