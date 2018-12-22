import React, {Component} from 'react';
import Template from '../../common/template';
import {Col, Row, Button, Form, Input, Select, DatePicker} from 'antd';
import TableComponent from '../../component/tableComponent';
import Layer from '../../component/layer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as FinanceActions from '../../redux/action/finance/finance';

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;


class ProjectProgress extends Component {

    add = () => {
        this.refs.layer.getWrappedInstance().showModal()
    }

    doSubmit = () => {
        const form = this.props.form
        return new Promise(function (resolve,reject) {
            form.validateFields((err,values) => {
                if(!err) {
                    resolve(values)
                }
            })
        })
    }


    render() {

        const columns = [{
            title: '进度类型',
            dataIndex: 'design_type',
        }, {
            title: '设计阶段',
            dataIndex: 'design_phase',
        }, {
            title: '开始日期',
            dataIndex: 'start_data',
        }, {
            title: '验收日期',
            dataIndex: 'acceptance_date',
        }, {
            title: '负责人',
            dataIndex: 'design_user',
        }, {
            title: '完工日期',
            dataIndex: 'completion_date',
        }, {
            title: '预计天数',
            dataIndex: 'expected_days',
        }, {
            title: '状态',
            dataIndex: 'status',
        }, {
            title: '操作',
            render: () => {
                return (
                    <span>
                    </span>
                )
            }
        }];

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                sm: {span: 5},
            },
            wrapperCol: {
                sm: {span: 15},
            },
        };


        return (
            <Template>
                <div style={{height: '50px', lineHeight: '50px'}}>
                    <Row type="flex" justify="space-between">
                        <Col>
                            <p className="project-info db"><span>项目编号:</span><span>123</span></p>
                            <p className="project-info db-30"><span>项目名称:</span><span>123</span></p>
                        </Col>
                        <Col>
                            <Button onClick={this.add}>新增进度</Button>
                        </Col>
                    </Row>
                </div>

                <TableComponent
                    size="middle"
                    columns={columns}
                    testUrl="https://www.easy-mock.com/mock/5c185df39172fa10e61b63b3/erp/erp/design/showbudgethtml"
                />

                <Layer ref="layer" title="新增进度" doSubmit={this.doSubmit}>

                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="阶段类型："
                        >
                            {getFieldDecorator('design_type', {
                                rules: [{
                                    required: true, message: '请输入装修面积!',
                                }],
                            })(
                                <Select>
                                    <Option value="1">123</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="设计阶段："
                        >
                            {getFieldDecorator('design_phase', {
                                rules: [{
                                    required: true, message: '请输入设计阶段!',
                                }],
                            })(
                                <Input/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="开始日期："
                        >
                            {getFieldDecorator('start_data', {
                                rules: [{
                                    required: true, message: '请选择日期!',
                                }],
                            })(
                                <DatePicker/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="预计天数："
                        >
                            {getFieldDecorator('expected_days', {
                                rules: [{
                                    required: true, message: '请输入预计天数!',
                                }],
                            })(
                                <Input/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="备注："
                        >
                            {getFieldDecorator('design_desc', {
                                rules: [{
                                    initialValue: ''
                                }]
                            })(
                                <TextArea/>
                            )}
                        </FormItem>

                    </Form>


                </Layer>

            </Template>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        finance: state.finance,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        financeActions: bindActionCreators(FinanceActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ProjectProgress))