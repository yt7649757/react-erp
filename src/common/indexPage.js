import React, {Component} from 'react';
import {Route,Switch} from "react-router-dom";
import {config} from '../routes/config'
import PrivateRoute from '../common/privateRoute';
import Template from '../common/template';

class IndexPage extends Component {

    test = () => {
        return config.map(item => (
            item.children && item.children.map((subItem, index) =>
                (
                    <PrivateRoute key={index} path={subItem.path} component={subItem.component}/>
                )
            )
        ))
    }


    render() {
        return (
            <Route path="/erp" render={(history,location,match) => (
                <Template history={history} location={location} match={match} >
                    {this.test()}
                </Template>
            )}/>
        )
    }
}

export default IndexPage