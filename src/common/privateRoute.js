import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';
import cookie from 'react-cookies'

class PrivateRoute extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: ''
        }
    }

    componentWillMount(){
        let  isAuthenticated = cookie.load("access_token")
        this.setState({isAuthenticated:isAuthenticated})
        if(!isAuthenticated){
            const {history} = this.props;
            setTimeout(() => {
                history.replace("/");
            }, 1000)
        }
    }

    render(){
        let { component: Component,path="/",exact=false,strict=false} = this.props;
        // console.log(Component)
        return this.state.isAuthenticated ?  (
            <Route  path={path} exact={exact}  strict={strict}  render={(props)=>{
                return <Component {...props} />
            }} />
        ) : (<Redirect to ="/" />);
    }
}

PrivateRoute.propTypes  ={
    path:PropTypes.string.isRequired,
    exact:PropTypes.bool,
    strict:PropTypes.bool,
    component:PropTypes.func.isRequired
}


export default PrivateRoute