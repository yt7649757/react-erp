import React, {Component} from 'react';
import {Layout, Menu, Avatar, Icon, Dropdown, message, Modal, Input } from 'antd';
import {withRouter} from 'react-router-dom';
// import storage from '../utils/storage.js';
import emitter from "./ev"
import cookie from 'react-cookies'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../redux/action/user';

import '../style/header.css'

const {Header} = Layout;
let lock = true

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
        if(lock) {
            lock= false
            this.props.userActions.loginOut().then(res => {
                if(res.data.message) {
                    sessionStorage.clear()
                    cookie.remove('access_token')
                    cookie.remove('userInfo')
                    message.success('注销成功', 1);
                    this.props.history.push('/')
                    document.title = '装企云管家'
                    lock = true
                }
            }).catch(err => {
                alert(err)
                lock = true
            })
        }
    }

    closeAside = () => {
        emitter.emit("close");
    }


    render() {
        const menu = (
            <Menu>
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
                    <div className="logo"><img src={require('../asset/img/logo.png')} alt="logo"/></div>
                    <span className="bread-nav" onClick={this.closeAside}></span>
                </div>
                <div className="userInfo">
                    <Avatar size="large" icon="user" style={{verticalAlign: 'middle'}} />
                    <Dropdown overlay={menu} >
                        <a className="ant-dropdown-link" style={{verticalAlign: 'middle'}}>
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