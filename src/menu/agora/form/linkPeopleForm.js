import React, { Component } from 'react';
import {Form, Input, Select } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../../redux/action/agora/agora';

const FormItem = Form.Item;
// const {TextArea} = Input;

const Option = Select.Option;


class LinkPeopleForm extends Component {

    componentDidMount() {
        this.props.agoraActions.getPayment()
    }


    getItemsValue = ()=>{
        const { form } = this.props
        //表单验证
        return new Promise(function (resolve) {
            form.validateFields((err,values) => {
                if(!err) {
                    // const value= this.props.form.getFieldsValue();
                    //时间类组件的 value 类型为 moment 对象，所以在提交服务器前需要预处理。
                    // const v = {
                    //     ...value,
                    //     'payment_date': value['payment_date'].format('YYYY-MM-DD'),
                    // }
                    // return v;
                    resolve(values)
                }
            })
        })

    }

    submit = (url,params) => {
        //axios应该返回的是一个Promise对象
        return this.props.agoraActions.addLinkPeople(url,params)
    }

    render() {

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                sm: {span: 5},
            },
            wrapperCol: {
                sm: {span: 19},
            },
        };

        const { selectGroup } = this.props
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="姓名"
                >
                    {getFieldDecorator('contact_name', {
                        rules: [{
                            required:false,
                            pattern: new RegExp(/^[\u4E00-\u9FA5]+$/, "g"),
                            message: '只允许汉字',
                        }, {
                            required: true, message: '请输入姓名',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="性别"
                    hasFeedback
                >
                    {getFieldDecorator('sex', {
                        rules: [
                            { required: true, message: '请选择!' },
                        ],
                    })(
                        <Select >
                            {
                                selectGroup['sex'] ? (
                                    Object.keys(selectGroup['sex']).map(key => {
                                        return (
                                            <Option key={key} value={key}>{selectGroup['sex'][key]}</Option>
                                        )
                                    })
                                ): null
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="电话"
                >
                    {getFieldDecorator('contact_number', {
                        rules: [{
                            required:false,
                            pattern: new RegExp(/^1(3|4|5|7|8)\d{9}$/, "g"),
                            message: '手机号格式错误',
                        }, {
                            required: true, message: '请输入正确的手机号',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="QQ"
                >
                    {getFieldDecorator('customer_qq', {
                        initialValue: '',
                        // rules: [{
                        //     required:false,
                        //     pattern: new RegExp(/^[1-9]\d{4,10}$/, "g"),
                        //     message: '请输入正确格式的QQ',
                        // }, {
                        //     required: true, message: '请输入QQ!',
                        // }],
                        // getValueFromEvent: (event) => {
                        //     return event.target.value.replace(/\D/g,'')
                        // }
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                >
                    {getFieldDecorator('customer_email', {
                        initialValue: '',
                        // rules: [{
                        //     type: 'email', message: '邮箱格式错误!',
                        // }, {
                        //     required: true, message: '请输入你的邮箱!',
                        // }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="与户主关系"
                    hasFeedback
                >
                    {getFieldDecorator('householder_relation', {
                        rules: [{
                            required:false,
                            pattern: new RegExp(/\S/, "g"),
                            message: '不能为空',
                        }, {
                            required: true, message: '请选择!',
                        }],
                    })(
                        <Select>
                            {
                                selectGroup['householder_relation'] ? (
                                    Object.keys(selectGroup['householder_relation']).map(key => {
                                        return (
                                            <Option key={key} value={key}>{selectGroup['householder_relation'][key]}</Option>
                                        )
                                    })
                                ): null
                            }
                        </Select>
                    )}
                </FormItem>

            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        agora: state.agora,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        agoraActions: bindActionCreators(AgoraActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LinkPeopleForm))