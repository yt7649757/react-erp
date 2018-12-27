import React, {Component} from 'react';
import {Form, Input, Select, DatePicker, Radio, Row, Col} from 'antd';
const RadioGroup = Radio.Group;

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;


class CollectForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: '2',
        }

    }

    componentDidMount() {
        this.props.form.setFieldsValue({})
    }


    handleSelectChange = (value) => {
        this.props.form.setFieldsValue({
            collect_name: value,
        });
    }

    radioChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    render() {

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                sm: {span: 7},
            },
            wrapperCol: {
                sm: {span: 17},
            },
        };


        return (
            <Form>

                <Row>
                    <Col span={12}>
                        <p className="project-info ml-23">
                            <span>合同编号:</span>
                            <span>123</span>
                        </p>
                    </Col>
                    <Col span={12}>
                        <p className="project-info ml-23">
                            <span>项目名称:</span>
                            <span>陈先生</span>
                        </p>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <p className="project-info ml-23">
                        <span>单据号:</span>
                        <span>12312313213123123213</span>
                        </p>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <FormItem
                            {...formItemLayout}
                            label="款项类型"
                        >
                            {getFieldDecorator('collect_type', {})(
                                <Select onChange={this.handleSelectChange}>
                                    <Option value="1">信用卡</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            {...formItemLayout}
                            label="款项名称"
                        >
                            {getFieldDecorator('collect_name', {

                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                </Row>


                <Row>
                    <Col span={12}>
                        <FormItem
                            {...formItemLayout}
                            label="金额"
                        >
                            {getFieldDecorator('fpje', {

                            })(
                                <Input/>
                            )}
                        </FormItem>
                    </Col>
                </Row>


                <Row>
                    <Col span={12} onChange={this.radioChange}>
                        <FormItem
                            {...formItemLayout}
                            label="是否开发票"
                        >
                            {getFieldDecorator('kfp', {
                                initialValue: 2
                            })(
                                <RadioGroup>
                                    <Radio value={1}>开发票</Radio>
                                    <Radio value={2}>不开发票</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>

                    </Col>

                    {
                        this.state.value === '1' ? (
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="发票金额"
                                >
                                    {getFieldDecorator('fpje', {

                                    })(
                                        <Input/>
                                    )}
                                </FormItem>

                            </Col>
                        ): null
                    }

                </Row>


                <Row>
                    <Col span={12}>
                        <FormItem
                            {...formItemLayout}
                            label="计划收款日期"
                        >
                            {getFieldDecorator('date', {})(
                                <DatePicker/>
                            )}
                        </FormItem>
                    </Col>

                    <Col span={12}>
                        <FormItem
                            {...formItemLayout}
                            label="出纳人"
                        >
                            {getFieldDecorator('username', {})(
                                <Select>
                                    <Option value="1">熊熊</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>

                </Row>


                <FormItem
                    label="款项说明"
                >
                    {getFieldDecorator('apply_desc', {})(
                        <TextArea rows={3} style={{resize: 'none'}}/>
                    )}
                </FormItem>


            </Form>
        )
    }
}


export default Form.create()(CollectForm)