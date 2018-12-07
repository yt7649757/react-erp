import React, { Component } from 'react';
import {Form, Input, Select } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../../redux/action/agora/agora';

const FormItem = Form.Item;
const {TextArea} = Input;

const Option = Select.Option;


class UselessFrom extends Component {

    componentDidMount() {
        this.props.form.setFieldsValue({
            project_name: this.props.data[0].project_name
        })
    }

    // getItemsValue = ()=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
    //     const value= this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
    //     console.log(value)
    //     return value;
    // }

    getItemsValue = ()=>{
        const { form } = this.props
        return new Promise(function (resolve) {
            form.validateFields((err,values) => {
                if(!err) {
                    resolve(values)
                }
            })
        })

    }


    submit = (url,params) => {
        return this.props.agoraActions.addUselessForm(url,params).then(val => {
            return val
        })
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

        const { selectGroup } = this.props.agora;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="项目名称"
                >
                    {getFieldDecorator('project_name', {
                        // initialValue: '',
                        // rules: [{
                        //     pattern: new RegExp(/\S/, "g"),
                        //     message: '不能为空',
                        // }, {
                        //     required: true, message: '请输入项目名称!',
                        // }],
                    })(
                        <Input disabled/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="废单类型"
                >
                    {getFieldDecorator('apply_type', {
                        initialValue: '',
                        rules: [ {
                            required: true, message: '请选择废单类型!',
                        }],
                    })(
                        <Select>
                            {
                                selectGroup['waste_single_type'] ? (
                                    Object.keys(selectGroup['waste_single_type']).map(key => {
                                        return (
                                            <Option key={key} value={key}>{selectGroup['waste_single_type'][key]}</Option>
                                        )
                                    })
                                ): null
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="废单说明"
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


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UselessFrom))