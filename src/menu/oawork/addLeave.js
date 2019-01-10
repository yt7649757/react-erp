import React, { Component } from 'react';
// import Template from '../../common/template';
import { Divider, Form, Input, Select, DatePicker, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea

class AddLeave extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };

        return(
            <div>
                <Divider>请假申请</Divider>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="姓名"
                    >
                        {getFieldDecorator('contact_name', {

                        })(
                            <span>熊熊</span>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公司"
                    >
                        {getFieldDecorator('contact_name', {

                        })(
                            <span>深圳市紫藤设计有限公司</span>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="部门"
                    >
                        {getFieldDecorator('contact_name', {

                        })(
                            <span>测试部门</span>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="职位"
                    >
                        {getFieldDecorator('contact_name', {

                        })(
                            <span>开发测试账号</span>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="请假类型"
                    >
                        {getFieldDecorator('leave_type', {

                        })(
                            <Select>
                                <Option value="1">事假</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="开始日期"
                    >
                        {getFieldDecorator('start_time', {

                        })(
                            <DatePicker/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="结束日期"
                    >
                        {getFieldDecorator('end_time', {

                        })(
                            <DatePicker/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="请假事由"
                    >
                        {getFieldDecorator('leave_content', {

                        })(
                            <TextArea/>
                        )}
                    </FormItem>
                    <FormItem style={{textAlign: 'center',marginTop: 40}}
                              {...formItemLayout}
                    >
                        <div className="operate">
                            <Button type="primary" htmlType="submit">提交</Button>
                            <Button type="default" htmlType="reset">重置</Button>
                        </div>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
export default Form.create()(AddLeave)