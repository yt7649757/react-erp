import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import storage from '../utils/storage.js';
import { port } from '../common/port'
import {withRouter} from 'react-router-dom';
// import $ from 'jquery';
// import 'whatwg-fetch';
import axios from 'axios';
import cookie from 'react-cookies'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../redux/action/user';

import '../style/login.css';
const FormItem = Form.Item;

class Login extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount () {
        // if(storage.get('access_token')) {
        //     this.props.history.push('/erp')
        // }
           if(cookie.load('access_token')) {
               this.props.history.push('/erp')
           }
    }

    shouldComponentUpdate(nextProps) {
        if(nextProps.user.status == 'success') {
            var maxAge = 3600
            const { access_token, remember } = nextProps.user
            if(remember) {
                maxAge = 3600 * 24 * 7
            }
            // storage.set('access_token', access_token)
            cookie.save('access_token', access_token, {
                    maxAge: maxAge
            })
            this.props.history.push('/erp')
            return false
        }
            return true
    }

    handleSubmit = async(e) => {
        e.preventDefault();
        const history =  this.props.history
        const _this = this
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //使用redux
                 this.props.userActions.login(values.userName,values.password,values.remember)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>下次自动登录</Checkbox>
                        )}
                        <a className="login-form-forgot" href="/resetPas">忘 记 密 码</a>
                        {
                            this.props.user.status == 'loading'?(
                                <Button type="primary" disable="true" className="login-form-button">
                                    正 在 登 录 中 ...
                                </Button>
                            ):(
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登 录
                                </Button>
                            )
                        }
                        Or <a href="/register">立即注册!</a>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        store: state.store,
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}

const WrappedNormalLoginForm  = withRouter(Form.create()(Login))

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WrappedNormalLoginForm)