import React, { Component } from 'react';
import {Form, Input, Select } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../../redux/action/agora/agora';
import RoomStructure from "../table/roomStructure";

const FormItem = Form.Item;
// const {TextArea} = Input;

const Option = Select.Option;


class RoomStructureForm extends Component {

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
                    label="房屋结构"
                >
                    {getFieldDecorator('living_room_structure', {
                        initialValue: '',
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
                    label="房屋用途"
                    hasFeedback
                >
                    {getFieldDecorator('housing_use', {
                        initialValue: '',
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
                    label="房屋朝向"
                >
                    {getFieldDecorator('house_orientation', {
                        initialValue: '',
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
                    label="采光"
                >
                    {getFieldDecorator('lighting', {
                        initialValue: '',
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
                    label="房屋类型"
                >
                    {getFieldDecorator('house_type', {
                        initialValue: '',
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
                    label="楼层"
                    hasFeedback
                >
                    {getFieldDecorator('floor', {
                        initialValue: '',
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


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RoomStructureForm))