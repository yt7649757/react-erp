import React, { Component } from 'react';
import {Form, Input, Select, Row, Col } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../../redux/action/agora/agora';

const FormItem = Form.Item;
const {TextArea} = Input;

const Option = Select.Option;


class EditForm extends Component {

    componentDidMount() {
        const data = this.props.data[0]
        this.props.form.setFieldsValue({
            // ...(this.props.data[0])
            project_name: data.project_name,
            expected_duration: data.expected_duration,
            decoration_area: data.decoration_area,
            project_budget: data.project_budget,
            project_address: data.project_address,
            decoration_grade: data.decoration_grade,
            color_orientation: data.color_orientation,
            decoration_style: data.decoration_style,
            decoration_type: data.decoration_type,
            customer_source: data.customer_source,
            project_description: data.project_description
        })
    }


    // getItemsValue = ()=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
    //     const value= this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
    //     console.log(value)
    //     return value;
    // }


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
        //axios应该返回的是一个Promise对象
        return this.props.agoraActions.editRow(url,params)
    }



    render() {

        const {getFieldDecorator} = this.props.form;
        const { selectGroup } = this.props.agora

        const formItemLayout = {
            labelCol: {
                sm: {span: 8},
            },
            wrapperCol: {
                sm: {span: 16},
            },
        };

        const TextAreaLayout = {
            labelCol: {
                sm: {span: 4},
            },
            wrapperCol: {
                sm: {span: 20},
            },
        }

        return (
            <Form>
                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="项目名称"
                        >
                            {getFieldDecorator('project_name', {
                                rules: [{
                                    required: true, message: '请输入项目名称!',
                                }],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="预算总工期"
                        >
                            {getFieldDecorator('expected_duration', {
                                rules: [{
                                    required: true, message: '请输入预算总工期!',
                                }],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="装修面积"
                        >
                            {getFieldDecorator('decoration_area', {
                                rules: [{
                                    required: true, message: '请输入装修面积!',
                                }],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                </Row>


                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="工程预算"
                        >
                            {getFieldDecorator('project_budget', {
                                rules: [{
                                    required: true, message: '请输入工程预算!',
                                }],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="工程地址"
                        >
                            {getFieldDecorator('project_address', {
                                // rules: [{
                                //     required: true, message: '请选择!',
                                // }],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                </Row>


                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="装修档次"
                        >
                            {getFieldDecorator('decoration_grade', {
                                initialValue: '',
                                rules: [ {
                                    required: true, message: '请选择!',
                                }],
                            })(
                                <Select onChange={this.handleChange}>
                                    {
                                        selectGroup['decoration_grade'] ? (
                                            Object.keys(selectGroup['decoration_grade']).map(key => {
                                                return (
                                                    <Option key={key} value={key}>{selectGroup['decoration_grade'][key]}</Option>
                                                )
                                            })
                                        ): null
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="色彩取向"
                        >
                            {getFieldDecorator('color_orientation', {
                                initialValue: '',
                                rules: [ {
                                    required: true, message: '请选择!',
                                }],
                            })(
                                <Select onChange={this.handleChange}>
                                    {
                                        selectGroup['color_orientation'] ? (
                                            Object.keys(selectGroup['color_orientation']).map(key => {
                                                return (
                                                    <Option key={key} value={key}>{selectGroup['color_orientation'][key]}</Option>
                                                )
                                            })
                                        ): null
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="装修风格"
                        >
                            {getFieldDecorator('decoration_style', {
                                initialValue: '',
                                rules: [ {
                                    required: true, message: '请选择!',
                                }],
                            })(
                                <Select onChange={this.handleChange}>
                                    {
                                        selectGroup['decoration_style'] ? (
                                            Object.keys(selectGroup['decoration_style']).map(key => {
                                                return (
                                                    <Option key={key} value={key}>{selectGroup['decoration_style'][key]}</Option>
                                                )
                                            })
                                        ): null
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>


                <Row>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="装修类型"
                        >
                            {getFieldDecorator('decoration_type', {
                                initialValue: '',
                                rules: [ {
                                    required: true, message: '请选择!',
                                }],
                            })(
                                <Select onChange={this.handleChange}>
                                    {
                                        selectGroup['decoration_type'] ? (
                                            Object.keys(selectGroup['decoration_type']).map(key => {
                                                return (
                                                    <Option key={key} value={key}>{selectGroup['decoration_type'][key]}</Option>
                                                )
                                            })
                                        ): null
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="客户来源"
                        >
                            {getFieldDecorator('customer_source', {
                                initialValue: '',
                                rules: [ {
                                    required: true, message: '请选择!',
                                }],
                            })(
                                <Select onChange={this.handleChange}>
                                    {
                                        selectGroup['customer_source'] ? (
                                            Object.keys(selectGroup['customer_source']).map(key => {
                                                return (
                                                    <Option key={key} value={key}>{selectGroup['customer_source'][key]}</Option>
                                                )
                                            })
                                        ): null
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span={16}>
                        <FormItem
                            {...TextAreaLayout}
                            label="项目要求"
                        >
                            {getFieldDecorator('project_description', {
                                // rules: [{
                                //     required: true, message: '请选择!',
                                // }],
                            })(
                                <TextArea rows={3} style={{resize: 'none'}}/>
                            )}
                        </FormItem>
                    </Col>
                </Row>
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


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(EditForm))