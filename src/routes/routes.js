import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from '../common/privateRoute';
import Template from '../common/template';
import { config } from '../routes/config';
import WrappedNormalLoginForm from '../login/login';
import Page from '../menu/page';
import Version from "../menu/other/version";
import ExcellentTeam from "../menu/other/excellentTeam";
import ProjectExample from "../menu/other/projectExample";
import AuxiliaryMaterialmall from "../menu/other/auxiliaryMaterialmall";
import PrimaryMaterialmall from "../menu/other/primaryMaterialmall";
import '../style/app.css'

class Routes extends Component {

    test = () => {
      const r = config.map(item=> (
            item.children && item.children.map((subItem,index) =>
                (
                    <PrivateRoute key={index} path={subItem.path} component={subItem.component} />
                )
            )
      ))
        return r
    }

    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={WrappedNormalLoginForm} />
                    <PrivateRoute exact path="/erp" component={Page} />
                    <PrivateRoute exact path="/erp/index/material" component={PrimaryMaterialmall}/>
                    <PrivateRoute exact path="/erp/Index/electron" component={ProjectExample}/>
                    <PrivateRoute exact path="/erp/index/material_auxiliary" component={AuxiliaryMaterialmall}/>
                    <PrivateRoute exact path="/erp/Index/team" component={ExcellentTeam}/>
                    <PrivateRoute exact path="/install/update/checkUpdate" component={Version}/>
                    <Route path="/erp" render={({history,loaction,match}) => (
                        <Template history={history} match={match} >
                            {this.test()}
                        </Template>
                    )}>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default Routes