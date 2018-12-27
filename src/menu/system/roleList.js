import React, {Component} from 'react';
import Template from '../../common/template'
import {Table, Tag, Divider, Button, Modal, Form, Input, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SystemManageActions from '../../redux/action/system/systemManage';
import '../../style/agora/roleList.css';
import storage  from '../../utils/storage';

const FormItem = Form.Item;
const {TextArea} = Input;
const confirm = Modal.confirm;

//当前页数
let current = 1;
class RoleList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            status: 1,
            pagination: {
                showQuickJumper: true,
                pageSize: 10
            },
            current: 1,
            loading: false,
            show: false,
            visible: false,
            selectedRowKeys: [],
            selectedRows: [],
            addRoleLoading: false,
            update: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            current: nextProps.systemManage.userLoginList.current_page,
            total: nextProps.systemManage.userLoginList.total
        })
    }

    // 页码改变的回调，参数是改变后的页码及每页条数 Function(page, pageSize)
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
        var res = await this.props.systemManageActions.getRoleList(params, pagination.pageSize, status)
        if (res) {
            pagination.total = res.data.total;

            pagination.showTotal = function (total) {
                return `总共有${total}条数据`
            }

            this.setState({
                pagination,
                loading: false
            })
        } else {
            alert('加载出错!')
        }
    }

    showModal = (params) => {
        if(params === 'update') {
            const { selectedRows } = this.state
            if(selectedRows.length > 0 && selectedRows.length <= 1 ) {
                this.setState({
                    visible: true,
                    update: selectedRows[0].guid  //guid
                },() => {
                    this.props.form.setFieldsValue({
                        role_name: selectedRows[0].role_name,
                        role_remarks: selectedRows[0].role_desc
                    })
                });
            }else {
                message.info('请选择一行数据编辑')
            }
        }else {
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
        guid? (this.edit(guid)) : (this.add())
    }


    //添加
    add = () => {
        this.props.form.validateFields(
            (err, values) => {
                if (!err) {
                    this.setState({addRoleLoading: true})
                    console.info('success');
                    //添加
                    this.props.systemManageActions.addRole({
                        action: 'create',
                        role_name: values.role_name,
                        role_desc: values.role_remarks
                    }).then(data => {
                        if (data && data.status === 'Success') {
                            message.info('添加成功')
                            this.setState({
                                visible: false,
                                addRoleLoading: false
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
                    this.setState({addRoleLoading: true})
                    console.info('success');
                    //添加
                    this.props.systemManageActions.editRole({
                        action: 'update',
                        guid: guid,
                        role_name: values.role_name,
                        role_desc: values.role_remarks
                    }).then(data => {
                        if (data && data.status === 'Success') {
                            message.info('修改成功')
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
            },
        );
    }


    //删除弹窗
    showConfirm = () => {
        const _this = this;
        const {selectedRows} = this.state;
        if (selectedRows.length === 0) {
            return message.info('请至少选择一行数据')
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
        this.props.systemManageActions.deleteRole({
            action: 'delete',
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
    }

    //权限
    authority = (phone,edit) => {
        const {selectedRows} = this.state;
        if (selectedRows.length === 0 || selectedRows.length > 1 ) {
             message.info('请选择一行数据')
        }else {
            let r = storage.get('routes');
            let p,e = null;
            phone? p = true : p = false;
            edit? e = true : e = false;
            const url = `erp/system/getrolenodelist/role_id/${selectedRows[0].guid}/is_mobile/0`;
            const obj = {
                guid: `jsqx`,
                menu_name: `${selectedRows[0].role_name}的权限`,
                url: url,
                phone: p,
                edit: e
            }

            if(JSON.stringify(r).indexOf('jsqx') === -1) {
                r.push(obj)
            }else {
                r.map(item => {
                    if(item.guid === 'jsqx') {
                        item.menu_name = selectedRows[0].role_name + '的权限';
                        item.url = url
                        item.phone = p
                        item.edit = e
                    }
                })
            }

            storage.set('routes', r)
            this.props.history.push('/' + url)
            sessionStorage.setItem('current', url )

        }
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
        const {data} = this.props.systemManage.roleList;

        const {getFieldDecorator} = this.props.form;

        const {selectedRowKeys} = this.state;

        const formItemLayout = {
            labelCol: {
                sm: {span: 5},
            },
            wrapperCol: {
                sm: {span: 17},
            },
        };


        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const columns = [{
            title: '角色名称',
            dataIndex: 'role_name',
            width: '20%',
        }, {
            title: '角色备注',
            dataIndex: 'role_desc',
        }, {
            title: '状态',
            filters: [
                {text: '全部', value: '1'},
                {text: '已删除', value: '2'},
                {text: '禁用', value: '3'},
                {text: '正常', value: '4'},
            ],
            filterMultiple: false,
            dataIndex: 'status',
            render: function (text, record, index) {
                return record.status === 1 ? <Tag color="#1890FF">正常</Tag> : <Tag color="red">已删除</Tag>
            }
        }, {
            title: '创建时间',
            dataIndex: 'create_time'
        }, {
            title: '操作',
            render: () => (
                <span>
          <a href="javascript:void (0);" onClick={() => this.authority()}>查看</a>
          <Divider type="vertical"/>
          <a href="javascript:;" onClick={() => this.authority('', true)} >编辑PC</a>
          <Divider type="verticla"/>
          <a href="javascript:;" onClick={() => this.authority(true,true)} >编辑手机</a>
         </span>
            )
        }
        ];


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
                    title={this.state.update?'编辑数据': '添加数据'}
                    visible={this.state.visible}
                    onOk={this.addEditRow}
                    onCancel={this.hideModal}
                    confirmLoading={this.state.addRoleLoading}
                    destroyOnClose={true}
                    okText="确定"
                    cancelText="取消"
                    width={416}
                >
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="角色名称"
                        >
                            {getFieldDecorator('role_name', {
                                rules: [{
                                    pattern: new RegExp(/\S/, "g"),
                                    message: '不能为空',
                                }, {
                                    required: true, message: '请输入角色名称!',
                                }],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="职位备注"
                        >
                            {getFieldDecorator('role_remarks', {
                                // rules: [{
                                //     type: 'string', message: 'The input is not valid E-mail!',
                                // }, {
                                //     required: false, message: 'Please input your E-mail!',
                                // }],
                            })(
                                <TextArea rows={5} style={{resize: 'none'}}/>
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
        systemManage: state.systemManage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        systemManageActions: bindActionCreators(SystemManageActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RoleList))