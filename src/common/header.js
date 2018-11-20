import React, {Component} from 'react';
import {Layout, Menu, Avatar, Icon, Dropdown, message, Modal, Input } from 'antd';
import {withRouter} from 'react-router-dom';
// import storage from '../utils/storage.js';
import cookie from 'react-cookies'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../redux/action/user';
import axios from 'axios';

import '../style/header.css'

const {Header} = Layout;

class HeaderComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            check: '',
            pas: '',
            newpas: '',
            newpas1: ''
        }
        this.signOut = this.signOut.bind(this)
        this.changePas = this.changePas.bind(this)
    }


    componentWillMount() {
        this.props.userActions.getUserInfo()
    }


    componentDidMount() {

    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    hideModal = () => {
        this.setState({
            visible: false,
        });
    }


    changePas = async() => {
        const { newpas, newpas1, pas } = this.state
        if(newpas.length < 6 || newpas1.length <6) {
            this.setState({
                check: '新密码长度至少6位以上'
            })
        }
        else if( newpas!==newpas1 ) {
            this.setState({
                check: '两次输入的密码不一致',
            })
        }else {
            //修改密码
            const status = await this.props.userActions.updatePas(pas,newpas,newpas1)
            console.log(status)
            if(status && status.status ==='Success') {
                message.info('修改密码成功')
                this.setState({
                    visible: false,
                    pas: '',
                    newpas: '',
                    newpas1: ''
                })
            }else {
                this.setState({
                    check: '密码修改失败'
                })
            }
        }
    }


    setOriginPas = (e) =>  {
        this.setState({
            check: '',
            pas: e.target.value
        })
    }

    setPas = (e) => {
        this.setState({
            check: '',
            newpas: e.target.value
        })
    }

    setPas1 = (e) => {
        this.setState({
            check: '',
            newpas1: e.target.value
        })
    }

    signOut = () => {
        // storage.remove('access_token')
        this.props.userActions.loginOut()
        cookie.remove('access_token')
        cookie.remove('userInfo')
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
        console.log(this.props.user)
        const menu = (
            <Menu>
                {/*这里a标签要给/signOut，否则无法正常跳转*/}
                <Menu.Item>
                    <a rel="noopener noreferrer" href="javascript:void(0);"
                       onClick={this.showModal}>修改密码</a>
                </Menu.Item>
                <Menu.Item>
                    <a rel="noopener noreferrer" href="javascript:void(0);"
                       onClick={this.signOut}>注销</a>
                </Menu.Item>
            </Menu>
        );


        return (
            <Header className="header">
                <div style={{float: 'left'}}>
                    <img className="logo" src={require('../asset/img/logo.png')} alt="logo"/>
                    <span className="bread-nav"></span>
                </div>
                <div className="userInfo">
                    <Avatar size="large" icon="user"/>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link">
                            {this.props.user.userInfo?this.props.user.userInfo.name:'加载中...'}  <Icon type="down"/>
                        </a>
                    </Dropdown>
                </div>
                <Modal
                    title="修改密码"
                    visible={this.state.visible}
                    mask={false}
                    width={300}
                    onOk={this.changePas}
                    onCancel={this.hideModal}
                    okText="确认修改"
                    cancelText="取消"
                >
                    <p style={{color: 'red'}}>{ this.state.check }</p>
                    <Input style = {style.input}
                           placeholder="你的密码" type="password"
                           value={this.state.pas}
                           onChange={this.setOriginPas} />
                    <Input style = {style.input}
                           placeholder="请输入新密码" type="password"
                           value={this.state.newpas}
                           onChange={this.setPas} />
                    <Input style = {style.input}
                           placeholder="再次输入新密码" type="password"
                           value={this.state.newpas1}
                           onChange={this.setPas1} />
                </Modal>
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

const style = {
    input: {
        marginTop: 10
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HeaderComponent));