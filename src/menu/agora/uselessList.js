import React, { Component } from 'react';
import Template from '../../common/template';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../redux/action/agora/agora';
import { Table,Modal, Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const {TextArea} = Input;

const Option = Select.Option;


class UselessList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pagination: {
                showQuickJumper: true
            },
            loading: false,
            columns: [],
            status: 1,
            visible: false
        }
    }

    componentDidMount() {
        this.request()
    }


    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return
        }
    }


    handleTableChange = (pagination) => {
        this.request(pagination.current)
    }

    request = async(params = 1) => {
        const pagination = { ...this.state.pagination };
        const status = this.state.status
        pagination.pageSize = 10
        this.setState({
            loading: true
        })

        var res = await this.props.agoraActions.getUselessList(params,pagination.pageSize,status)

        if(res) {
            pagination.total = res.data.total;
            pagination.current = params

            pagination.showTotal = function (total) {
                return `总共有${total}条数据`
            }
            this.setState({
                pagination,
                loading: false,
            })
        }else {
            alert('加载出错')
        }

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    hideModal = () => {
        this.setState({
            visible: false,
        });
    }



    render() {

        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                sm: {span: 5},
            },
            wrapperCol: {
                sm: {span: 15},
            },
        };


        const { data } = this.props.agora.useLessList

        const columns = [{
            title: '项目名称',
            dataIndex: 'project_name',
        }, {
            title: '申请人',
            dataIndex: 'name',
        },{
            title: '申请说明',
            dataIndex: 'apply_desc',
            width: '30%'
        },{
            title: '操作',
            render: () => {
                return (
                    <a href="javascript:void(0);" onClick={this.showModal}>审核</a>
                )
            }
        }];



        return (
            <Template>
                <Table
                    style={{backgroundColor: '#fff'}}
                    rowKey={record => record.guid}
                    columns={columns}
                    dataSource={data}
                    size="middle"
                    loading={this.state.loading}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
                <Modal
                    title="废单审核"
                    visible={this.state.visible}
                    onOk={this.submitModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="项目名称"
                        >
                            {getFieldDecorator('payment_id', {
                                initialValue: '',
                                rules: [{
                                    pattern: new RegExp(/\S/, "g"),
                                    message: '不能为空',
                                }],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="审核"
                        >
                            {getFieldDecorator('payment_price', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请选择!',
                                }],
                            })(
                                <Select>
                                    <Option value="1">111</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="审核说明"
                        >
                            {getFieldDecorator('payment_date', {
                                initialValue: ''
                            })(
                                <TextArea/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>

            </Template>
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

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(UselessList))