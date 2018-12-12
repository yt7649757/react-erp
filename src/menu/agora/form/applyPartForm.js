import React, { Component } from 'react';
import {Form, Input, Select } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../../redux/action/agora/agora';

const FormItem = Form.Item;
const {TextArea} = Input;

const Option = Select.Option;


class ApplyPartForm extends Component {

    componentDidMount() {
        // this.props.agoraActions.getPayment()
        const data = this.props.data
        this.props.form.setFieldsValue({
            project_name: data.project_name
        })
    }


    getItemsValue = ()=>{
        const { form } = this.props
        //表单验证
        return new Promise(function (resolve) {
            form.validateFields((err,values) => {
                if(!err) {
                    resolve(values)
                }
            })
        })

    }

    submit = (url,params) => {
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

        // const { payment } = this.props.agora
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="项目名称"
                >
                    {getFieldDecorator('project_name', {
                        initialValue: '',
                    })(
                        <Input disabled/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="转入部门"
                >
                    {getFieldDecorator('into_department_id', {
                        initialValue: '',
                        rules: [{
                            pattern: new RegExp(/\S/, "g"),
                            message: '不能为空',
                        }, {
                            required: true, message: '请选择!',
                        }],
                    })(
                        <Select onChange={this.handleChange}>
                            {
                                // payment? (
                                //     payment.map(key => {
                                //         return (
                                //             <Option key={key.guid} value={key.guid}>{key.name}</Option>
                                //         )
                                //     })
                                // ) : null
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="说明"
                >
                    {getFieldDecorator('apply_desc', {
                        // rules: [{
                        //     type: 'string', message: 'The input is not valid E-mail!',
                        // }, {
                        //     required: false, message: 'Please input your E-mail!',
                        // }],
                    })(
                        <TextArea rows={5} style={{resize: 'none'}}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ApplyPartForm))