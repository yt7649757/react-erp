import React, { Component } from 'react';
import {Form, Input } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../../redux/action/agora/agora';

const FormItem = Form.Item;
const {TextArea} = Input;



class LogForm extends Component {

    componentDidMount() {
        this.props.form.setFieldsValue({
            project_name: this.props.data.project_name,
            username: this.props.user.userInfo.name
        })
    }


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
                sm: {span: 19},
            },
        };


        return (
            <Form>
                <FormItem  style={{marginBottom: 0}}
                    {...formItemLayout}
                    label="项目名称"
                >
                    {getFieldDecorator('project_name', {
                    })(
                        <Input className="input-text" disabled/>
                    )}
                </FormItem>

                <FormItem style={{marginBottom: '10px' }}
                    {...formItemLayout}
                    label="操作人"
                >
                    {getFieldDecorator('username', {
                    })(
                        <Input className="input-text" disabled/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="跟踪内容"
                >
                    {getFieldDecorator('apply_desc', {
                        rules: [ {
                            required: true, message: '请输入跟踪内容',
                        }],
                    })(
                        <TextArea rows={3} style={{resize: 'none'}}/>
                    )}
                </FormItem>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        agora: state.agora,
        user:  state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        agoraActions: bindActionCreators(AgoraActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LogForm))