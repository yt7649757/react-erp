import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group'
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
        const location = this.props.location
        return(
            <TransitionGroup>
                <CSSTransition key={location.pathname} timeout={300} classNames="example"  appear={true} >
                    <LocaleProvider locale={zh_CN}>
                        <div>
                            <Switch location={location}>
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
                                                    />
                                                )
                                            })
                                        ): (
                                            <PrivateRoute
                                                key={index}
                                                path={route.path}
                                                exact={route.exact}
                                                component={route.component}
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
                </CSSTransition>
            </TransitionGroup>

        )
    }
}

export default IndexPage