import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, Icon, Select } from 'antd';
import Template from '../../common/template';
import '../../style/agora/workRegister.css'

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const styles = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
}

class WorkRegister extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    reset = () => {
        this.props.form.resetFields()
    }

    validFunction = (rule,value,callback) => {
          if(!(/\S/).test(value)) {
              callback('该项不能为空')
          }else {
              callback()
          }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Template>
            <form className="project-info" onSubmit={this.handleSubmit} onReset={this.reset} >
                <div className="top shadow">
                    <div className="project-title">
                        <p>项目基本信息</p>
                    </div>
                    <Row style={styles}>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="项目名称："
                            >
                                {getFieldDecorator('projectName', {
                                    rules: [{
                                        required:false,
                                        pattern: new RegExp(/\S/, "g"),
                                        message: '不能为空',
                                    }, {
                                        required: true, message: '请输入项目名称',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="装修面积："
                            >
                                {getFieldDecorator('area', {
                                    rules: [{
                                        required:false,
                                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                                        message: '请输入数字',
                                    }, {
                                        required: true, message: '请输入装修面积!',
                                    }],
                                    // getValueFromEvent: (event) => {
                                    //     return event.target.value.replace(/\D/g,'')
                                    // }
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="工程预算"
                            >
                                {getFieldDecorator('budget', {
                                    rules: [{
                                        required:false,
                                        pattern: new RegExp(/\S/, "g"),
                                        message: '不能为空',
                                    }, {
                                        required: true, message: '请输入工程预算!',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={styles}>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="预计总工期："
                            >
                                {getFieldDecorator('timeLimit', {
                                    rules: [{
                                        required:false,
                                        pattern: new RegExp(/\S/, "g"),
                                        message: '不能为空',
                                    },  {
                                        required: true, message: '请输入预计总工期!',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="装修档次"
                            >
                                {getFieldDecorator('level', {
                                    rules: [{
                                        required:false,
                                        pattern: new RegExp(/\S/, "g"),
                                        message: '不能为空',
                                    },  {
                                        required: true, message: '请输入装修档次!',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="装修风格"
                            >
                                {getFieldDecorator('style', {
                                    rules: [{
                                        required:false,
                                        pattern: new RegExp(/\S/, "g"),
                                        message: '不能为空',
                                    },  {
                                        required: true, message: '请输入装修风格!',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={styles}>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="装修类型"
                                hasFeedback
                            >
                                {getFieldDecorator('type', {
                                    rules: [
                                        { required: true, message: '请选择装修类型!' },
                                    ],
                                })(
                                    <Select placeholder="请选择装修类型">
                                        <Option value="china">China</Option>
                                        <Option value="usa">U.S.A</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="色彩取向"
                                hasFeedback
                            >
                                {getFieldDecorator('color', {
                                    rules: [
                                        { required: true, message: '请选择色彩取向!' },
                                    ],
                                })(
                                    <Select placeholder="请选择色彩取向">
                                        <Option value="china">China</Option>
                                        <Option value="usa">U.S.A</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="客户来源"
                                hasFeedback
                            >
                                {getFieldDecorator('origin', {
                                    rules: [
                                        { required: true, message: '请选择客户来源!' },
                                    ],
                                })(
                                    <Select placeholder="请选择客户来源">
                                        <Option value="china">China</Option>
                                        <Option value="usa">U.S.A</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={styles}>
                        <Col span={12} pull={2}>
                            <FormItem
                                {...formItemLayout}
                                label="项目要求"
                                hasFeedback
                            >
                                {getFieldDecorator('ask', {
                                    rules: [{
                                        validator: this.validFunction
                                    },
                                        { required: true, message: '请输入项目要求!' },
                                    ],
                                })(
                                   <Input.TextArea rows={3} cols={10} style={{resize: 'none'}} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="工程地址"
                                hasFeedback
                            >
                                {getFieldDecorator('address', {
                                    rules: [
                                        { required: true, message: '请选择工程地址!' },
                                    ],
                                })(
                                    <Select placeholder="请选择工程地址">
                                        <Option value="china">China</Option>
                                        <Option value="usa">U.S.A</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div className="bottom shadow">
                    <div className="project-title link-people">
                        <p>主要联系人</p>
                    </div>
                    <Row style={styles}>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="姓名"
                            >
                                {getFieldDecorator('username', {
                                    rules: [{
                                        required:false,
                                        pattern: new RegExp(/\S/, "g"),
                                        message: '不能为空',
                                    }, {
                                        required: true, message: '请输入你的姓名!',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="联系电话"
                            >
                                {getFieldDecorator('phone', {
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
                        </Col>
                        <Col span={6}>
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
                                    <Select placeholder="请选择性别">
                                        <Option value="man">男</Option>
                                        <Option value="women">女</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={styles}>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="QQ"
                            >
                                {getFieldDecorator('qq', {
                                    rules: [{
                                        required:false,
                                        pattern: new RegExp(/^[1-9]\d{4,10}$/, "g"),
                                        message: '请输入正确格式的QQ',
                                    }, {
                                        required: true, message: '请输入QQ!',
                                    }],
                                    // getValueFromEvent: (event) => {
                                    //     return event.target.value.replace(/\D/g,'')
                                    // }
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="邮箱"
                            >
                                {getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email', message: '邮箱格式错误!',
                                    }, {
                                        required: true, message: '请输入你的邮箱!',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="与户主关系"
                            >
                                {getFieldDecorator('username', {
                                    rules: [{
                                        required:false,
                                        pattern: new RegExp(/\S/, "g"),
                                        message: '不能为空',
                                    }, {
                                        required: true, message: '请填写与户主关系!',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <FormItem style={{textAlign: 'center',marginTop: 40}}
                    wrapperCol={{ span: 24, offset: 0 }}
                >
                    <Button type="primary" htmlType="submit">提交</Button>
                    <Button type="default" htmlType="reset">重置</Button>
                </FormItem>
            </form>
            </Template>
        )
    }

}


export default Form.create()(WorkRegister)