import React, {Component} from 'react';
import Template from '../../common/template'
import {Table, Tag, Button, Modal, Form, Input, message, Row, Col, Radio, TreeSelect, InputNumber } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SystemManageActions from '../../redux/action/system/systemManage';
import '../../style/agora/roleList.css';

const FormItem = Form.Item;
const {TextArea} = Input;
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;

let current = 1;
class NodeList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            status: 1,
            pagination: {
                showQuickJumper: true
            },
            loading: false,
            show: false,
            visible: false,
            selectedRowKeys: [],
            selectedRows: [],
            addNodeLoading: false,
            update: '',
            //选择的树选项
            value: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            current: nextProps.systemManage.userLoginList.current_page,
            total: nextProps.systemManage.userLoginList.total
        })
    }

    handleTableChange = (pagination) => {
        current = pagination.current
        this.request(pagination.current)
    }

    request = async (params = 1) => {
        const pagination = {...this.state.pagination};
        const status = this.state.status
        pagination.pageSize = 10
        this.setState({
            loading: true
        })
        var res = await this.props.systemManageActions.getNodeList(params, pagination.pageSize, status)
        if (res) {
            pagination.total = res.data.total;

            pagination.showTotal = function (total) {
                return `总共有${total}条数据`
            }

            //使用state存取current
            // pagination.current = params

            this.setState({
                pagination,
                loading: false
            })
        } else {
            message.error('加载出错!')
        }
    }

    showModal = (params) => {
        if (params === 'update') {
            const {selectedRows} = this.state
            if (selectedRows.length > 0 && selectedRows.length <= 1) {
                this.setState({
                    visible: true,
                    update: selectedRows[0].guid  //guid
                }, () => {
                    this.props.form.setFieldsValue({
                        // ...selectedRows[0],
                        is_menu: selectedRows[0].is_menu + '',
                        auth_grade: selectedRows[0].auth_grade + '',
                        action_name: selectedRows[0].action_name,
                        pid: selectedRows[0].pid,
                        status: selectedRows[0].status,
                        node_name: selectedRows[0].node_name,
                        control_name: selectedRows[0].control_name,
                        module_name: selectedRows[0].module_name,
                        icon: selectedRows[0].icon,
                        group: selectedRows[0].group,
                        node_desc: selectedRows[0].node_desc
                    })
                });
            } else {
                message.error('请选择一行数据编辑')
            }
        } else {
            this.setState({
                visible: true,
                update: '',
            });
        }
    }

    hideModal = () => {
        this.setState({
            visible: false,
            update: ''
        });
    }

    addEditRow = () => {
        const guid = this.state.update
        guid ? (this.edit(guid)) : (this.add())
    }


    //添加
    add = () => {
        this.props.form.validateFields(
            (err, values) => {
                if (!err) {
                    this.setState({addNodeLoading: true})
                    values.action = 'create'
                    //添加
                    this.props.systemManageActions.addNode({
                        ...values
                    }).then(data => {
                        if (data && data.status === 'Success') {
                            message.info('添加节点成功')
                            this.setState({
                                visible: false,
                                addNodeLoading: false
                            })
                            this.request()
                        }
                    })
                }
            },
        );
    }

    //编辑
    edit = (guid) => {
        this.props.form.validateFields(
            (err, values) => {
                if (!err) {
                    this.setState({addNodeLoading: true})
                    //修改
                    values.action = 'update'
                    values.guid = guid
                    this.props.systemManageActions.editNode({
                        ...values
                    }).then(data => {
                        if (data && data.status === 'Success') {
                            message.info('修改成功')
                            this.setState({
                                visible: false,
                                addNodeLoading: false,
                                selectedRowKeys: [],
                                selectedRows: []
                            })
                            this.request(current)
                        }
                    })
                }
            },
        );
    }


    //删除弹窗
    showConfirm = () => {
        const _this = this;
        const {selectedRows} = this.state;
        if (selectedRows.length === 0) {
            return message.error('请至少选择一行数据')
        }
        confirm({
            title: '你确定要删除吗?',
            content: '',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                _this.deleteRow()
            },
            onCancel() {
            },
        });
    }

    deleteRow = () => {
        var rows = []
        let {selectedRows} = this.state;
        selectedRows.map(val => rows.push(val.guid))
        this.props.systemManageActions.deleteNode({
            // action: 'delete',
            guids: rows
        }).then(data => {
            if (data && data.status === 'Success') {
                message.info('删除成功')
                this.setState({
                    visible: false,
                    addRoleLoading: false,
                    selectedRowKeys: [],
                    selectedRows: []
                })
                this.request(current)
            }
        })

    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys, selectedRows});
    }

    componentDidMount() {
        this.request()
        //请求树菜单
        const treeUrl = '/api/erp/system/shownodejson/top/1/is_mobile/0';
        this.props.systemManageActions.getTreeList(treeUrl)
    }


    selectTreeNode = (value,label,extra) => {
        this.setState({ value });
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode value={item.id} title={item.title} key={item.guid} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode value={item.id} {...item} key={item.guid} />;
        });
    }

    changeStatus = () => {
        this.setState({
            status: -1
        },() => {
            this.request()
        })
    }


    showAll = () => {
        this.setState({
            status: 1
        },() => {
            this.request()
        })
    }

    render() {
        const {data} = this.props.systemManage.nodeList;

        const {getFieldDecorator} = this.props.form;

        const {selectedRowKeys} = this.state;

        const formItemLayout = {
            labelCol: {
                sm: {span: 6},
            },
            wrapperCol: {
                sm: {span: 18},
            },
        };


        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const columns = [{
            title: '父节点',
            dataIndex: 'parent_node.node_name',
        }, {
            title: '节点名称',
            dataIndex: 'node_name',
        }, {
            title: '模块名称',
            dataIndex: 'module_name',
        }, {
            title: '控制器名称',
            dataIndex: 'control_name',
        }, {
            title: '方法名称',
            dataIndex: 'action_name',
        }, {
            title: '图标ICON',
            dataIndex: 'icon',
        }, {
            title: '浏览权限',
            filters: [
                {text: '全部', value: ''},
                {text: '不登录', value: '0'},
                {text: '需登录', value: '1'},
            ],
            filterMultiple: false,
            dataIndex: 'auth_grade',
            render: function (text, record, index) {
                return record.auth_grade === 0 ? <span>不登录</span> : <span>需登录</span>
            }
        }, {
            title: '是否菜单',
            filters: [
                {text: '全部', value: ''},
                {text: '隐藏', value: '0'},
                {text: '显示', value: '1'}
            ],
            filterMultiple: false,
            dataIndex: 'is_menu',
            render: function (text, record, index) {
                return record.is_menu === 0 ? <span>隐藏</span> : <span>显示</span>
            }
        }, {
            title: '分组',
            dataIndex: 'group'
        }, {
            title: '排序',
            dataIndex: 'sort'
        }, {
            title: '状态',
            filters: [
                {text: '全部', value: ''},
                {text: '已删除', value: '-1'},
                {text: '禁用', value: '0'},
                {text: '正常', value: '1'},
            ],
            filterMultiple: false,
            dataIndex: 'status',
            render: function (text, record, index) {
                return record.status === -1 ? <Tag color="#f5222d">已删除</Tag> : (record.status === 0 ? (
                    <Tag color="#1890FF">禁用</Tag>) : (<Tag color="#1890FF">正常</Tag>))
            }
        }, {
            title: '创建时间',
            dataIndex: 'create_time'
        }
        ];

        const {roleTree} = this.props.systemManage
        console.log(roleTree)

        return (
            <Template>
                <div className="operate">
                    <Button type="primary" onClick={this.showModal} style={{marginRight: 5}}>
                        添加
                    </Button>
                    <Button type="default" onClick={() => this.showModal('update')} style={{marginRight: 5}}>
                        编辑
                    </Button>
                    <Button type="dashed" icon="redo" onClick={this.request} style={{marginRight: 5}}>
                        刷新
                    </Button>
                    <Button type="danger" onClick={this.showConfirm} style={{marginRight: 5}}>
                        删除
                    </Button>
                    <Button type="dashed" icon="delete" onClick={this.changeStatus} style={{marginRight: 5}} >
                        回收站
                    </Button>
                    <Button type="dashed"  onClick={this.showAll} >
                        显示全部
                    </Button>
                </div>
                <Table
                    style={{backgroundColor: '#fff'}}
                    rowKey={record => record.guid}
                    columns={columns}
                    rowSelection={rowSelection}
                    dataSource={data}
                    loading={this.state.loading}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    size="middle"
                />

                <Modal
                    title={this.state.update ? '编辑数据' : '添加数据'}
                    visible={this.state.visible}
                    onOk={this.addEditRow}
                    onCancel={this.hideModal}
                    confirmLoading={this.state.addRoleLoading}
                    destroyOnClose={true}
                    okText="确定"
                    cancelText="取消"
                    width={900}
                    centered={true}
                >
                    <Form>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="父节点"
                                >
                                    {getFieldDecorator('pid', {
                                        rules: [{
                                            required: true, message: '请选择!',
                                        }],
                                    })(
                                        <TreeSelect
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder="请选择"
                                            allowClear
                                            onChange={this.selectTreeNode}
                                        >
                                            {
                                                roleTree ? this.renderTreeNodes(roleTree) : null
                                            }
                                        </TreeSelect>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="节点"
                                >
                                    {getFieldDecorator('node_name', {
                                        rules: [{
                                            pattern: new RegExp(/\S/, "g"),
                                            message: '不能为空',
                                        }, {
                                            required: true, message: '请输入节点名称!',
                                        }],
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
                                    label="模块"
                                >
                                    {getFieldDecorator('module_name', {
                                        rules: [{
                                            pattern: new RegExp(/\S/, "g"),
                                            message: '不能为空',
                                        }, {
                                            required: true, message: '请输入模块名称!',
                                        }],
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="控制器"
                                >
                                    {getFieldDecorator('control_name', {
                                        rules: [{
                                            pattern: new RegExp(/\S/, "g"),
                                            message: '不能为空',
                                        }, {
                                            required: true, message: '请输入控制器名称!',
                                        }],
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
                                    label="操作"
                                >
                                    {getFieldDecorator('action_name', {
                                        initialValue: '',
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="排序"
                                >
                                    {getFieldDecorator('sort', {
                                        initialValue: 1,
                                        rules: [{
                                            pattern: new RegExp(/\S/, "g"),
                                            message: '不能为空',
                                        }, {
                                            required: true, message: '请输入排序!',
                                        }],
                                    })(
                                        <InputNumber min={1} max={3} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="菜单显示"
                                >
                                    {getFieldDecorator('is_menu', {
                                        initialValue: '1',
                                    })(
                                        <RadioGroup>
                                            <Radio value="1">显示</Radio>
                                            <Radio value="0">隐藏</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="浏览权限"
                                >
                                    {getFieldDecorator('auth_grade', {
                                        initialValue: '1',
                                    })(
                                        <RadioGroup>
                                            <Radio value="1">需登录</Radio>
                                            <Radio value="0">无需登录</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="图标"
                                >
                                    {getFieldDecorator('icon',{
                                        initialValue: '',
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="分组"
                                >
                                    {getFieldDecorator('group', {
                                        initialValue: '',
                                    })(
                                        <Input/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={20} pull={2}>
                                <FormItem
                                    label="节点描述"
                                    {...formItemLayout}
                                    style={{justifyContent: 'flex-start'}}
                                >
                                    {getFieldDecorator('node_desc', {
                                        initialValue: '',
                                    })(
                                        <TextArea rows={3} style={{resize: 'none',display:'inline-block'}}/>
                                    )}
                                </FormItem>

                            </Col>
                        </Row>

                    </Form>

                </Modal>
            </Template>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        systemManage: state.systemManage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        systemManageActions: bindActionCreators(SystemManageActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(NodeList))