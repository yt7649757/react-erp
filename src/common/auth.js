import React from 'react';
import {withRouter} from 'react-router-dom';
import cookie from 'react-cookies';

function Auth(WrappedComponent,hocProps){
    if(!!!WrappedComponent){
        throw new Error("缺少组件参数");
        return false;
    }

    return withRouter( class extends React.Component{

        constructor(props) {
            super(props)
        }

        componentWillMount(){
            let  isAuthenticated = !!cookie.load("access_token");
            this.setState({isAuthenticated:isAuthenticated})
            if(!isAuthenticated){
                const {history} = this.props;
                setTimeout(() => {
                    history.replace("/");
                }, 1000)
            }
        }

        render(){
            return this.state.isAuthenticated ?  (
                <WrappedComponent {...this.props} />
            ) : ("请重新登录");
        }
    })
}


export default Auth;
