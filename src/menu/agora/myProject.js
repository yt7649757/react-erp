import React, {Component} from 'react';
import Template from '../../common/template';
import {Table, Divider, Button, Modal, message} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../redux/action/agora/agora';
import { changeTitle } from "../../utils/changeTitle";
import storage from '../../utils/storage';
import TableHoc from '../../component/tableHoc'
import OrderForm from './form/orderForm';
import UselessForm from './form/uselessForm'
import EditForm from './form/editForm';
import ApplyPartForm from './form/applyPartForm';
import UploadForm from './form/uploadForm';


let columns = [];
let current = [];

function CreateTab(url,obj) {
    this.url = url;
    this.obj = obj;
    this.r = storage.get('routes');
    CreateTab.prototype.create = function () {
        if(JSON.stringify(this.r).indexOf(this.obj.guid) === -1) {
            this.r.push(obj)
        }else {
            const _this = this;
            this.r.map(item => {
                if(item.guid === _this.obj.guid) {
                    item.menu_name = _this.obj.menu_name;
                    item.url = _this.url;
                    item.content = _this.obj.content;
                }
            })
        }
        storage.set('routes', this.r);
        sessionStorage.setItem('current', this.url );
    }
}


class MyProject extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            pagination: {
                // showQuickJumper: true
            },
            loading: false,
            columns: [],
            showMoreInfoText: true,
            showCheckInfoText: true,
            selectedRowKeys: [],
            selectedRows: [],
            visible: false,
            settings: ['decoration_grade','decoration_style','decoration_type','color_orientation','customer_source','waste_single_type'],
            forms: '',
            title: '',
            //当前行
            row: {}
        }
    }

    handleTableChange = (pagination) => {
        //无法setState存取current,总是取不到值
        current = pagination.current
        this.request(pagination.current)
    }

    request = async(params = 1) => {
        const pagination = { ...this.state.pagination };
        const status = this.state.status
        pagination.pageSize = 15
        this.setState({
            loading: true
        })
        var res = await this.props.agoraActions.getTables(params,pagination.pageSize,status)

        pagination.total = res && res.data.total;

        pagination.showTotal = function (total) {
            return `总共有${total}条数据`
        }
        console.log(columns)
        this.setState({
            pagination,
            loading: false,
            columns: columns
        })
    }


    componentDidMount() {
        this.request()
        this.state.settings.map(item => {
            this.props.agoraActions.getSelects(item)
        })
    }

    showMoreInfo = () => {
        const { columns } = this.state
        const { selectGroup } = this.props.agora
        if(this.state.showMoreInfoText) {
            const more = [
                {
                    title: '装修档次',
                    dataIndex: 'decoration_grade',
                    render: (text,row,index) => {
                      console.log(text)
                      return selectGroup['decoration_grade'][text]
                    }
                },{
                    title: '装修风格',
                    dataIndex: 'decoration_style',
                    render: (text,row,index) => {
                        return selectGroup['decoration_style'][text]
                    }
                },{
                    title: '装修类型',
                    dataIndex: 'decoration_type',
                    render: (text,row,index) => {
                        return selectGroup['decoration_type'][text]
                    }
                },{
                    title: '色彩取向',
                    dataIndex: 'color_orientation',
                    render: (text,row,index) => {
                        return selectGroup['color_orientation'][text]
                    }
                }, {
                    title: '项目要求',
                    dataIndex: 'project_description',
                }
            ]

            columns.splice(4,0,...more)

            this.setState({
                showMoreInfoText: !this.state.showMoreInfoText
            })
        }else {

           columns.splice(4,5)

            this.setState({
                showMoreInfoText: !this.state.showMoreInfoText
            })
        }
    }

    //显示更多审核信息
    showCheckInfo = () => {
        const { columns } = this.state
        if(this.state.showCheckInfoText) {
            const check = [
                {
                    title: '转部状态',
                    dataIndex: 'transfer_status111',
                },{
                    title: '转部说明',
                    dataIndex: 'transfer_status1',
                },{
                    title: '审核状态',
                    dataIndex: 'transfer_status2',
                },{
                    title: '审核说明',
                    dataIndex: 'examine_desc111',
                }
            ]
            columns.splice(this.state.columns.length-1,0,...check)
            this.setState({
                showCheckInfoText: !this.state.showCheckInfoText
            })
        }else {
            columns.splice(this.state.columns.length -5, 4)
            this.setState({
                showCheckInfoText: !this.state.showCheckInfoText
            })
        }
    }


    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRows);
        this.setState({ selectedRowKeys, selectedRows });
    }


    add = () => {
        this.props.history.push('/erp/Project/showProjectEntry')
    }


    showModal = (params,w) => {
        const { selectedRows } = this.state
        const title = changeTitle(params)
        // 如果w是对象，代表点击的是右边的操作选项
        if((typeof w.guid !== 'string' && selectedRows.length < 1) || selectedRows.length > 1) {
            return message.info('请选择一行数据')
        }
        this.setState({
            visible: true,
            forms: params,
            width: (typeof w ==='number'?w:540),   //修改框 宽度需要大一点
            title: title,
            row: (typeof w.guid === 'string' ? w : '')
        });
    }

    hideModal = () => {
        this.setState({
            visible: false,
        });
    }


    //提交到后台
    addEditRow = async() => {
      const { row } = this.state
      // id存在（代表点击的是表格右边的操作按钮，自动传入guid）
      const { guid } = row? row :this.state.selectedRows[0]
      let url = ''
      if(this.state.forms === 'OrderForm') {
          //添加定金
          url = `/api/erp/project_deposit/adddepositdata/guid/${guid}`
      }else if(this.state.forms === 'UselessForm') {
          //废单申请
          url = `/api/erp/project/wasteapply/guid/${guid}`
      }else if(this.state.forms === 'EditForm') {
          url = `/api/erp/project/projectedit/guid/${guid}`
      }else if(this.state.forms === 'UploadForm') {
          //附件上传
          url = `/api/erp/project/addfield/guid/${row.guid}`
      }

      this.formRef.getItemsValue().then(val => {
          if(val) {
              this.formRef.submit(url,val).then(res => {
                  if(res && res.status === 'Success') {
                      message.info(res.message)
                      this.setState({
                          selectedRowKeys: [],
                          selectedRows: [],
                          visible: false
                      })
                      this.request(current)
                  }
              })
          }
      }).catch(err => {
          alert('发生错误了'+ err)
      })

    }


    look = (params) => {
        const url = `erp/project/showprojectofuser/guid/${params.guid}`;
        new CreateTab(url,{
            guid: 'xmmx',
            menu_name: `项目明细`,
            url: url,
            content: params  //存取当前行信息
        }).create()
        this.props.history.push('/' + url)

    }


    changeStatus = () => {
        this.setState({
            status: -1,
            showMoreInfoText: true,
            showCheckInfoText: true,
        },() => {
            this.request()
        })
    }


    showAll = () => {
        this.setState({
            status: 1,
            showMoreInfoText: true,
            showCheckInfoText: true,
        },() => {
            this.request()
        })
    }


    deleteRow = () => {
        var rows = []
        let {selectedRows} = this.state;
        selectedRows.map(val => {
            rows.push(val.guid)
        })
        this.props.agoraActions.deleteProject({
            // action: 'delete',
            guids: rows
        }).then(data => {
            if (data && data.status === 'Success') {
                message.info('删除成功')
                this.setState({
                    visible: false,
                    loading: false,
                    selectedRowKeys: [],
                    selectedRows: []
                })
                this.request(current)
            }
        })

    }

    render() {
        const {data} = this.props.agora.tableList;
        const { selectGroup } = this.props.agora
        const { selectedRowKeys } = this.state;
        const { showConfirm } = this.props

        columns = [{
            title: '项目名称',
            dataIndex: 'project_name',
        }, {
            title: '装修面积',
            dataIndex: 'decoration_area',
        }, {
            title: '工程预算',
            dataIndex: 'project_budget',
        }, {
            title: '预计总工期',
            dataIndex: 'expected_duration',
        },{
            title: '客户来源',
            dataIndex: 'customer_source',
            render: (text,row,index) => {
                return (selectGroup['customer_source']?selectGroup['customer_source'][text]: '')
            }
        },{
            title: '操作',
            render: (text,record,index) => {
                const { guid } = record;
                return (
                    <span>
          <a href="javascript:void (0);" onClick={this.look.bind(this,record)}>查看详细</a>
          <Divider type="vertical"/>
          <a href="javascript:;" onClick={this.showModal.bind(this,'ApplyPartForm',record)}>申请转部</a>
          <Divider type="verticla"/>
          <a href="javascript:;" onClick={this.showModal.bind(this,'UploadForm',record)}>添加附件</a>
            <Divider type="verticla"/>
          <a href="javascript:;">操作记录</a>
        </span>
                )
            }
        }];


        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <Template>

                <div className="operate">
                    <Button type="primary" onClick={this.add} style={{marginRight: 5}}>
                        添加
                    </Button>
                    <Button type="primary" onClick={this.showModal.bind(this,'OrderForm')} style={{marginRight: 5}}>
                        添加定金单
                    </Button>
                    <Button type="primary" onClick={this.showModal.bind(this,'UselessForm')} style={{marginRight: 5}}>
                        废单申请
                    </Button>
                    <Button type="dashed"  onClick={this.showModal.bind(this,'EditForm',900)} style={{marginRight: 5}}>
                        修改
                    </Button>
                    <Button type="danger" onClick={showConfirm} style={{marginRight: 5}}>
                        删除
                    </Button>
                    <Button type="default" onClick={this.showMoreInfo} style={{marginRight: 5}}>
                        {this.state.showMoreInfoText? '显示更多信息' : '隐藏更多信息'}
                    </Button>
                    <Button type="default" onClick={this.showCheckInfo} style={{marginRight: 5}}>
                        {this.state.showCheckInfoText? '显示审核信息': '隐藏审核信息'}
                    </Button>
                    <Button type="dashed" icon="delete" onClick={this.changeStatus} style={{marginRight: 5}} >
                        回收站
                    </Button>
                    <Button type="dashed"  onClick={this.showAll} >
                        显示全部
                    </Button>
                </div>

                <Table
                    rowKey={record => record.id}
                    style={{backgroundColor: '#fff'}}
                    columns={this.state.columns}
                    dataSource={data}
                    loading = {this.state.loading}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    size="middle"
                    rowSelection={rowSelection}
                    // onRow={(record) => {
                    //     return {
                    //         onClick: (e) => {
                    //             e.currentTarget.getElementsByClassName("ant-checkbox-wrapper")[0].click()
                    //         },       // 点击行
                    //     };
                    // }}
                    // bordered={true}
                />

                <Modal
                    title={this.state.title}
                    visible={this.state.visible}
                    onOk={this.addEditRow}
                    onCancel={this.hideModal}
                    confirmLoading={this.state.addRoleLoading}
                    destroyOnClose={true}
                    okText="确定"
                    cancelText="取消"
                    width={this.state.width}
                    centered={true}
                >
                    {
                        this.state.forms === 'OrderForm' ? (<OrderForm
                            wrappedComponentRef={(form) => this.formRef = form}
                        />) : null
                    }

                    {
                        this.state.forms === 'UselessForm'? (<UselessForm
                            data={this.state.selectedRows}
                            wrappedComponentRef={(form) => this.formRef = form}
                        />) : null
                    }

                    {
                        this.state.forms === 'EditForm'? (
                            <EditForm data={this.state.selectedRows}  wrappedComponentRef={(form) => this.formRef = form}
                        />) : null
                    }

                    {
                        this.state.forms === 'ApplyPartForm' ? (
                            <ApplyPartForm
                                data={this.state.row}
                                wrappedComponentRef={(form) => this.formRef = form}
                            />
                        ): null
                    }

                    {
                        this.state.forms === 'UploadForm' ? (
                            <UploadForm
                                wrappedComponentRef={(form) => this.formRef = form}
                            />
                        ): null
                    }

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


export default connect(mapStateToProps, mapDispatchToProps)(TableHoc(MyProject))