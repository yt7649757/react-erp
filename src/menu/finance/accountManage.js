import React, { Component } from 'react';
import Template from '../../common/template';
import { Table, Divider, Form, Input } from 'antd';
import Layer from '../../component/layer';
import TableComponent from '../../component/tableComponent';

const FormItem = Form.Item;
const {TextArea} = Input;

class AccountManage extends Component {

    add = (params) => {
        console.log(params)
        this.props.form.setFieldsValue({
            name: params.name,
            ye: params.balance_price
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


    render() {

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                sm: {span: 6},
            },
            wrapperCol: {
                sm: {span: 16},
            },
        };


        const columns = [{
            title: '账号',
            dataIndex: 'name',
        }, {
            title: '收付款方式',
            dataIndex: 'payment_id',
        },{
            title: '账号管理者',
            dataIndex: 'uuid',
        },{
            title: '备注说明',
            dataIndex: 'desc',
        },{
            title: '账号余额',
            dataIndex: 'balance_price',
        },{
            title: '操作',
            render: (text,record) => {
                return (
                    <span>
                    <a href="javascript:;" onClick={() => this.add(text)}>更改余额</a>
                        <Divider type="verticla"/>
                          <a href="javascript:;">交易记录</a>
                            <Divider type="verticla"/>
                          <a href="javascript:;">删除账号</a>
                    </span>
                )
            }
        }];

        return (
            <Template>
                <TableComponent
                    columns={columns}
                    size="middle"
                    url="/api/erp/finance/showbanklist"
                />
                <Layer ref="layer" title="更改余额" doSubmit={this.doSubmit} reset={this.reset} width={416}>
                    <Form>
                        <FormItem style={{marginBottom: 0}}
                            {...formItemLayout}
                            label="账号："
                        >
                            {getFieldDecorator('name', {

                            })(
                                <Input className="input-text" disabled />
                            )}
                        </FormItem>

                        <FormItem style={{marginBottom: 0}}
                            {...formItemLayout}
                            label="余额："
                        >
                            {getFieldDecorator('ye', {

                            })(
                               <Input className="input-text" disabled/>
                            )}
                        </FormItem>

                        <FormItem
                                  {...formItemLayout}
                                  label="更改余额："
                        >
                            {getFieldDecorator('balance_price', {
                                rules: [{
                                    required: true, message: '请输入更改余额'
                                }]
                            })(
                                <Input/>
                            )}
                        </FormItem>

                        <FormItem
                                  {...formItemLayout}
                                  label="更改原因："
                        >
                            {getFieldDecorator('desc', {

                            })(
                                <TextArea rows={3} style={{resize: 'none'}} />
                            )}
                        </FormItem>
                    </Form>
                </Layer>
            </Template>
        )
    }
}

export default Form.create()(AccountManage)