import React, {Component} from 'react';
import Template from '../../common/template';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../redux/action/agora/agora';
import { Divider, Form, Input, Select } from 'antd';
import TableComponent from '../../component/tableComponent';
import Layer from '../../component/layer';
const FormItem = Form.Item;
const {TextArea} = Input;

const Option = Select.Option;

class WasteProjectApply extends Component {

    doApply = () => {
        this.refs.layer.getWrappedInstance().showModal()
    }

    reset = () => {
        this.props.form.resetFields()
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
            title: '项目名称',
            dataIndex: 'project_name',
        }, {
            title: '申请人',
            dataIndex: 'name',
        },{
            title: '申请说明',
            dataIndex: 'apply_desc',
        }, {
            title: '操作',
            render: () => {
                return(
                    <span>
                  <a href="javascript:;" onClick={this.doApply}>审核</a>
                 </span>
                )
            }
        }]


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
            <Template>
                <TableComponent columns={columns} size="middle" testUrl="https://www.easy-mock.com/mock/5c185df39172fa10e61b63b3/erp/showwasteprojectapply"/>
                <Layer ref="layer" title="申请审核" doSubmit={this.doSubmit} reset={this.reset}>
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="审核"
                        >
                            {getFieldDecorator('examine_status', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请选择!',
                                }],
                            })(
                                <Select>
                                    <Option value="1">1111111111</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="审核说明"
                        >
                            {getFieldDecorator('examine_desc', {
                                initialValue: ''
                            })(
                                <TextArea style={{resize: "none"}} rows={3} />
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
        agora: state.agora,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        agoraActions: bindActionCreators(AgoraActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(WasteProjectApply))