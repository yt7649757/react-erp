import React, { Component } from 'react';
// import Template from '../../common/template';
import { Button, message, Form, Select, DatePicker, Input } from 'antd';
import Layer from '../../component/layer';
import TableComponent from '../../component/tableComponent';

const columns = [{
    title: '项目名称',
    dataIndex: 'project_name',
}, {
    title: '支付方式',
    dataIndex: 'payment_name',
},{
    title: '定金单录入者',
    dataIndex: 'payment_uuid_name',
},{
    title: '付款金额',
    dataIndex: 'payment_price',
},{
    title: '付款日期',
    dataIndex: 'payment_date',
},{
    title: '录入时间',
    dataIndex: 'create_time',
}];

const FormItem = Form.Item;
const Option = Select.Option;

class ShowProjectDepositList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRows: []
        }
    }

    getRowSelection = (selectedRowKeys, selectedRows) => {
        console.log(selectedRows);
        this.setState({
            selectedRows
        })
    }

    reload = () => {
        this.child.request()
    }

    checkout = () => {
        if(this.state.selectedRows.length < 1 || this.state.selectedRows.length > 1 ) {
            message.error('请选择一行数据')
        }else {
            this.doApply()
        }
    }


    doApply = () => {
        const selectedRows = this.state.selectedRows
        console.log(selectedRows);
        this.props.form.setFieldsValue({
             project_name: selectedRows[0].project_name,
             payment_name: selectedRows[0].payment_name,
             payment_price: selectedRows[0].payment_price,
             create_time: selectedRows[0].create_time
        })
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


    reset = () => {
        this.props.form.resetFields()
    }


    onRef = (ref) => {
        this.child = ref
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
            <div>
                <div style={{marginBottom: '20px'}}>
                    <Button type="primary" className="btn-group" onClick={this.checkout}>审核</Button>
                    <Button className="btn-group" onClick={this.reload}>刷新</Button>
                    <Button className="btn-group">回收站</Button>
                </div>
                <TableComponent
                    onRef={this.onRef}
                    columns={columns}
                    size="midddle"
                    checkbox
                    getRowSelection={this.getRowSelection}
                    testUrl="https://www.easy-mock.com/mock/5c185df39172fa10e61b63b3/erp/erp/ProjectDeposit/showProjectDepositList"
                />
                <Layer ref="layer" title="定金审核" doSubmit={this.doSubmit} reset={this.reset}>
                    <Form>

                        <FormItem
                            style={{marginBottom: 0}}
                            {...formItemLayout}
                            label="项目名称："
                        >
                            {getFieldDecorator('project_name', {

                            })(
                                <Input className="input-text" disabled/>
                            )}
                        </FormItem>

                        <FormItem
                            style={{marginBottom: 0}}
                            {...formItemLayout}
                            label="付款方式："
                        >
                            {getFieldDecorator('payment_name', {

                            })(
                                <Input className="input-text" disabled/>
                            )}
                        </FormItem>

                        <FormItem
                            style={{marginBottom: 0}}
                            {...formItemLayout}
                            label="计划付款金额："
                        >
                            {getFieldDecorator('payment_price', {

                            })(
                                <Input className="input-text" disabled/>
                            )}
                        </FormItem>

                        <FormItem
                            style={{marginBottom: '10px'}}
                            {...formItemLayout}
                            label="计划付款日期："
                        >
                            {getFieldDecorator('create_time', {

                            })(
                                <Input className="input-text" disabled/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="收款账号："
                        >
                            {getFieldDecorator('design_type', {
                                rules: [{
                                    required: true, message: '请选择收款账号!',
                                }],
                            })(
                                <Select>
                                    <Option value="1">123</Option>
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="实际收款金额："
                        >
                            {getFieldDecorator('design_phase', {
                                rules: [{
                                    required: true, message: '请输入实际收款金额!',
                                }],
                            })(
                                <Input/>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label="收款日期："
                        >
                            {getFieldDecorator('start_data', {
                            })(
                                <DatePicker/>
                            )}
                        </FormItem>

                    </Form>
                </Layer>
            </div>
        )
    }
}

export default Form.create()(ShowProjectDepositList)