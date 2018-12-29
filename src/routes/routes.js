import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import '../style/app.css'
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