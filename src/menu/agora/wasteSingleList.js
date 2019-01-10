import React, {Component} from 'react';
import Template from '../../common/template';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../redux/action/agora/agora';
import { Divider, Form, Input } from 'antd';
import TableComponent from '../../component/tableComponent';
import Layer from '../../component/layer';

const FormItem = Form.Item;
const {TextArea} = Input;


class WasteSingleList extends Component {


    doApply = () => {
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
                sm: {span: 5},
            },
            wrapperCol: {
                sm: {span: 19},
            },
        };


        const columns = [{
            title: '项目名称',
            dataIndex: 'project_name',
        }, {
            title: '项目地址',
            dataIndex: 'project_address',
        }, {
            title: '操作',
            render: () => {
                return(
                    <span>
                  <a href="javascript:;">查看</a>
                  <Divider type="verticla"/>
                  <a href="javascript:;" onClick={this.doApply}>申请跟踪</a>
                 </span>
                )
            }
        }]

        return (
            <div>
                <TableComponent columns={columns} size="middle" testUrl="https://www.easy-mock.com/mock/5c185df39172fa10e61b63b3/erp/showWasteSingleList" />
                <Layer ref="layer" title="申请跟踪" doSubmit={this.doSubmit} reset={this.reset}>
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="申请说明"
                        >
                            {getFieldDecorator('payment_date', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请输入申请说明'
                                }]
                            })(
                                <TextArea style={{resize: "none"}} rows={3} />
                            )}
                        </FormItem>
                    </Form>

                </Layer>
            </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(WasteSingleList))