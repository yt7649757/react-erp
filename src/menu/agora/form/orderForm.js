import React, { Component } from 'react';
import {Form, Input, Select, InputNumber, DatePicker } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../../redux/action/agora/agora';

const FormItem = Form.Item;
const {TextArea} = Input;

const Option = Select.Option;


class OrderForm extends Component {

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
       return this.props.agoraActions.addPaymentForm(url,params)
    }

    render() {

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                sm: {span: 5},
            },
            wrapperCol: {
                sm: {span: 15},
            },
        };

        const { payment } = this.props.agora
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="付款方式"
                >
                    {getFieldDecorator('payment_id', {
                        initialValue: '',
                        rules: [{
                            pattern: new RegExp(/\S/, "g"),
                            message: '不能为空',
                        }, {
                            required: true, message: '请选择付款方式!',
                        }],
                    })(
                        <Select onChange={this.handleChange}>
                            {
                                payment? (
                                    payment.map(key => {
                                       return (
                                           <Option key={key.guid} value={key.guid}>{key.name}</Option>
                                       )
                                    })
                                ) : null
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="付款金额"
                >
                    {getFieldDecorator('payment_price', {
                        initialValue: 10000,
                        rules: [{
                            type: 'number', message: '请输入数字!',
                        }, {
                            required: true, message: '请输入付款金额!',
                        }],
                    })(
                        <InputNumber onChange={this.onChange} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="付款日期"
                >
                    {getFieldDecorator('payment_date', {
                        rules: [{
                            required: true, message: '请选择日期!',
                        }],
                    })(
                        <DatePicker/>
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


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(OrderForm))