import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, Select, message } from 'antd';
// import Template from '../../common/template';
import emitter from "../../common/ev";
import '../../style/agora/workRegister.css'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../redux/action/agora/agora';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: {
        xs: { span: 7 },
        sm: { span: 7 },
    },
    wrapperCol: {
        xs: { span: 17 },
        sm: { span: 17 },
    },
};

const styles = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
}

class WorkRegister extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                this.setState({
                    loading: true
                });
                //市场部
                values.project_type = 0
                this.props.agoraActions.addProject(values).then(val => {
                    if(val) {
                        this.setState({
                            loading: false
                        },() => {
                            emitter.emit('addProject')
                            this.reset()
                            message.info('提交成功')
                        })
                    }
                })
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

    handleChange = (value,params) => {
        // this.setState({
        //     params: value
        // })
    }


    requestSelect = (params) => {
        this.props.agoraActions.getSelects(params).then(val => {
            // console.log(val)
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { selectGroup } = this.props.agora
        return (
            <div>
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
                                {getFieldDecorator('project_name', {
                                    rules: [{
                                        required:false,
                                        pattern: new RegExp(/^[\u4E00-\u9FA5]+$/, "g"),
                                        message: '只允许汉字',
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
                                {getFieldDecorator('decoration_area', {
                                    rules: [{
                                        required:false,
                                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                                        message: '请输入数字',
                                    }, {
                                        required: true, message: '请输入装修面积!',
                                    }]
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
                                {getFieldDecorator('project_budget', {
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
                                {getFieldDecorator('expected_duration', {
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
                                hasFeedback
                            >
                                {getFieldDecorator('decoration_grade', {
                                    initialValue: '',
                                    // rules: [{
                                    //     required:false,
                                    //     pattern: new RegExp(/\S/, "g"),
                                    //     message: '不能为空',
                                    // },  {
                                    //     required: true, message: '请输入装修档次!',
                                    // }],
                                })(
                                    <Select notFoundContent="加载中"  onFocus={this.requestSelect.bind(this,'decoration_grade')} onChange={this.handleChange.bind(this,'decoration_grade')}>
                                        {
                                            selectGroup['decoration_grade'] ? (
                                                Object.keys(selectGroup['decoration_grade']).map(key => {
                                                    return (
                                                        <Option key={key} value={key}>{selectGroup['decoration_grade'][key]}</Option>
                                                    )
                                                })
                                            ): null
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="装修风格"
                                hasFeedback
                            >
                                {getFieldDecorator('decoration_style', {
                                    initialValue: '',
                                    // rules: [{
                                    //     required:false,
                                    //     pattern: new RegExp(/\S/, "g"),
                                    //     message: '不能为空',
                                    // },  {
                                    //     required: true, message: '请输入装修风格!',
                                    // }],
                                })(
                                    <Select notFoundContent="加载中" onFocus={this.requestSelect.bind(this,'decoration_style')} onChange={this.handleChange.bind(this,'decoration_style')}>
                                        {
                                            selectGroup['decoration_style'] ? (
                                                Object.keys(selectGroup['decoration_style']).map(key => {
                                                    return (
                                                        <Option key={key} value={key}>{selectGroup['decoration_style'][key]}</Option>
                                                    )
                                                })
                                            ): null
                                        }
                                    </Select>
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
                                {getFieldDecorator('decoration_type', {
                                    initialValue: '',
                                })(
                                    <Select notFoundContent="加载中" onFocus={this.requestSelect.bind(this,'decoration_type')} onChange={this.handleChange.bind(this,'decoration_type')}>
                                        {
                                            selectGroup['decoration_type'] ? (
                                                Object.keys(selectGroup['decoration_type']).map(key => {
                                                    return (
                                                        <Option key={key} value={key}>{selectGroup['decoration_type'][key]}</Option>
                                                    )
                                                })
                                            ): null
                                        }
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
                                {getFieldDecorator('color_orientation', {
                                    initialValue: '',
                                })(
                                    <Select notFoundContent="加载中" onFocus={this.requestSelect.bind(this,'color_orientation')} onChange={this.handleChange.bind(this,'color_orientation')}>
                                        {
                                            selectGroup['color_orientation'] ? (
                                                Object.keys(selectGroup['color_orientation']).map(key => {
                                                    return (
                                                        <Option key={key} value={key}>{selectGroup['color_orientation'][key]}</Option>
                                                    )
                                                })
                                            ): null
                                        }
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
                                {getFieldDecorator('customer_source', {
                                    initialValue: '',
                                })(
                                    <Select notFoundContent="加载中"  onFocus={this.requestSelect.bind(this,'customer_source')} onChange={this.handleChange.bind(this,'customer_source')}>
                                        {
                                            selectGroup['customer_source'] ? (
                                                Object.keys(selectGroup['customer_source']).map(key => {
                                                    return (
                                                        <Option key={key} value={key}>{selectGroup['customer_source'][key]}</Option>
                                                    )
                                                })
                                            ): null
                                        }
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
                            >
                                {getFieldDecorator('project_description', {
                                    initialValue: '',
                                })(
                                   <Input.TextArea rows={3} cols={10} style={{resize: 'none'}} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="工程地址"
                            >
                                {getFieldDecorator('project_address', {
                                    initialValue: '',
                                })(
                                    <Input />
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
                                {getFieldDecorator('contact_name', {
                                    rules: [{
                                        required:false,
                                        pattern: new RegExp(/^[\u4E00-\u9FA5]+$/, "g"),
                                        message: '只允许汉字',
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
                                {getFieldDecorator('contact_number', {
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
                                    <Select notFoundContent="加载中" onFocus={this.requestSelect.bind(this,'sex')} onChange={this.handleChange.bind(this,'sex')}>
                                        {
                                            selectGroup['sex'] ? (
                                                Object.keys(selectGroup['sex']).map(key => {
                                                    return (
                                                        <Option key={key} value={key}>{selectGroup['sex'][key]}</Option>
                                                    )
                                                })
                                            ): null
                                        }
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
                                {getFieldDecorator('customer_qq', {
                                    initialValue: '',
                                    rules: [{
                                        required:false,
                                        pattern: new RegExp(/^[1-9]\d{4,10}$/, "g"),
                                        message: '请输入正确格式的QQ',
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
                                {getFieldDecorator('customer_email', {
                                    initialValue: '',
                                    rules: [{
                                        required:false,
                                        pattern: new RegExp(/[a-zA-Z0-9_]+@[a-zA-Z0-9_]+(\.[a-zA-Z]+)+/, "g"),
                                        message: '邮箱格式不正确',
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
                                hasFeedback
                            >
                                {getFieldDecorator('householder_relation', {
                                    rules: [{
                                        required:false,
                                        pattern: new RegExp(/\S/, "g"),
                                        message: '不能为空',
                                    }, {
                                        required: true, message: '请选择!',
                                    }],
                                })(
                                    <Select notFoundContent="加载中" onFocus={this.requestSelect.bind(this,'householder_relation')} onChange={this.handleChange.bind(this,'householder_relation')}>
                                        {
                                            selectGroup['householder_relation'] ? (
                                                Object.keys(selectGroup['householder_relation']).map(key => {
                                                    return (
                                                        <Option key={key} value={key}>{selectGroup['householder_relation'][key]}</Option>
                                                    )
                                                })
                                            ): null
                                        }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <FormItem style={{textAlign: 'center',marginTop: 40}}
                    wrapperCol={{ span: 24, offset: 0 }}
                >
                    <Button type="primary" htmlType="submit" loading={this.state.loading}>提交</Button>
                    <Button type="default" htmlType="reset">重置</Button>
                </FormItem>
            </form>
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


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(WorkRegister))