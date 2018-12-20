import React from 'react';
import {Route,Redirect,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
// import storage from '../utils/storage.js';
import cookie from 'react-cookies'

// import WrappedNormalLoginForm  from '../login/login'

//私有路由，只有登录的用户才能访问
class PrivateRoute extends React.Component{
    componentWillMount(){
        let  isAuthenticated =  !!cookie.load("access_token")
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
        return this.state.isAuthenticated ?  (
            <Route  path={path} exact={exact}  strict={strict}  render={(props)=>( <Component {...props} /> )} />
        ) : (<Redirect to ="/" />);
    }
}
PrivateRoute.propTypes  ={
    path:PropTypes.string.isRequired,
    exact:PropTypes.bool,
    strict:PropTypes.bool,
    component:PropTypes.func.isRequired
}

export default withRouter(PrivateRoute);

