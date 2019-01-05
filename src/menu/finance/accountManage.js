import React, { Component } from 'react';
import Template from '../../common/template';
import { Divider, Form, Input, Select } from 'antd';
import Layer from '../../component/layer';
import CreateTab from '../../utils/createTab';
import TableComponent from '../../component/tableComponent';

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;

class AccountManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flag: '',
            title: ''
        }
    }

    add = (param,val) => {
        this.setState({
            flag: val,
            title: val==='edit'? '更改余额' : '删除数据'
        },() => {
            if(val === 'edit') {
                this.props.form.setFieldsValue({
                    name: param.name,
                    ye: param.balance_price
                })
                this.refs.layer.getWrappedInstance().showModal()
            }else if(val === 'delete') {
                this.props.form.setFieldsValue({
                    name: param.name,
                    ye: param.balance_price
                })
                this.refs.layer.getWrappedInstance().showModal()
            }else {
                alert('加载失败')
            }
        })
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


    lookRecord = (param) => {
        const url = `erp/finance/lookbanklog/guid/${param.guid}`;
        new CreateTab(url,{
            guid: `jyjl`,
            menu_name: '交易记录',
            url: url
        }).create()
        this.props.history.push('/' + url)
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
                    <a href="javascript:;" onClick={() => this.add(text,'edit')}>更改余额</a>
                        <Divider type="verticla"/>
                          <a href="javascript:;" onClick={() => this.lookRecord(text)}>交易记录</a>
                            <Divider type="verticla"/>
                          <a href="javascript:;" onClick={() => this.add(text,'delete')}>删除账号</a>
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
                <Layer ref="layer" title={this.state.title} doSubmit={this.doSubmit} reset={this.reset} width={416}>
                    {
                        this.state.flag === 'edit'? (
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
                        ): null
                    }
                    {
                        this.state.flag === 'delete'? (
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
                                          label="当前余额："
                                >
                                    {getFieldDecorator('ye', {

                                    })(
                                        <Input className="input-text" disabled/>
                                    )}
                                </FormItem>

                                <FormItem
                                    {...formItemLayout}
                                    label="转入账户："
                                >
                                    {getFieldDecorator('id', {
                                        rules: [{
                                            required: true, message: '请选择'
                                        }]
                                    })(
                                        <Select>
                                            <Option value="1">工程管理账号</Option>
                                        </Select>
                                    )}
                                </FormItem>

                                <FormItem
                                    {...formItemLayout}
                                    label="温馨提示："
                                >
                                    {getFieldDecorator('message', {

                                    })(
                                        <p>删除该账号需要选择一个转入账号，以便于保存该账号下的数据.请谨慎删除！</p>
                                    )}
                                </FormItem>
                            </Form>
                        ):null
                    }
                </Layer>
            </Template>
        )
    }
}

export default Form.create()(AccountManage)