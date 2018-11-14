import React, {Component} from 'react';
import {Layout, Menu, Avatar, Icon, Dropdown, message} from 'antd';
import {withRouter} from 'react-router-dom';
import storage from '../utils/storage.js';
import cookie from 'react-cookies'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../redux/action/user';

import '../style/header.css'

const {Header} = Layout;

class HeaderComponent extends Component {

    constructor(props) {
        super(props)
        this.signOut = this.signOut.bind(this)
    }

    componentWillReceiveProps(nextProps) {
    }


    signOut = () => {
        // storage.remove('access_token')
        this.props.userActions.loginOut()
        cookie.remove('access_token')
        message.success('注销成功', 1);
        console.log(this.props.history)
        this.props.history.push('/')
        // const { pathname } = this.props.location;
        // //动态改变标题
        // if(pathname === '/signOut') {
        //     document.title = '登录'
        // }
    }

    render() {
        const menu = (
            <Menu>
                {/*这里a标签要给/signOut，否则无法正常跳转*/}
                <Menu.Item>
                    <a rel="noopener noreferrer" href="javascript:void(0);"
                       onClick={this.signOut}>注销</a>
                </Menu.Item>
            </Menu>
        );


        return (
            <Header className="header">
                <div className="logo"/>
                <div>
                    <img className="logo" src={require('../asset/img/logo.png')} alt="logo"/>
                </div>
                <div className="userInfo">
                    <Avatar size="large" icon="user"/>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link">
                            mikkle <Icon type="down"/>
                        </a>
                    </Dropdown>
                </div>
            </Header>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HeaderComponent));