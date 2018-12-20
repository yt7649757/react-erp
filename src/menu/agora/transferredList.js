import React, {Component} from 'react';
import Template from '../../common/template';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../redux/action/agora/agora';
import {Table, Divider, Modal} from 'antd';
import Layer from '../../component/layer';
import UploadForm from './form/uploadForm';

let current = 1;

class TransferredList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pagination: {
                showQuickJumper: true
            },
            loading: false,
            columns: [],
            status: 1,
        }
    }

    componentDidMount() {
        this.request()
    }

    handleTableChange = (pagination) => {
        //无法setState存取current,总是取不到值
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

        var res = await this.props.agoraActions.getTransferredList(params, pagination.pageSize, status)

        if (res) {
            pagination.total = res.data.total;

            pagination.showTotal = function (total) {
                return `总共有${total}条数据`
            }
            this.setState({
                pagination,
                loading: false,
            })
        } else {
            alert('加载出错')
        }

    }


    doApply = () => {
        // redux方法获取refs
        this.refs.layer.getWrappedInstance().showModal()
        console.log(this.formRef)
    }


    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return false
        }
    }


    render() {
        const pagination = this.state.pagination.current ? this.state.pagination.current : 1
        const pageSize = this.state.pagination.pageSize ? this.state.pagination.pageSize : 0
        const {data} = this.props.agora.transferredList

        const columns = [{
            title: '',
            render:(text,record,index)=> {
                return(
                    <span>{(pagination-1)* pageSize + index + 1}</span>
                )
            },
            key: 'key'
        },{
            title: '项目名称',
            dataIndex: 'project_name',
            width: '50%',
            key: 'project_name'
        }, {
            title: '操作',
            render: () => {
                return (
                    <span>
                    <a href="javascript:;">查看</a>
                        <Divider type="verticla"/>
                          <a href="javascript:;" onClick={this.doApply}>添加附件</a>
                            <Divider type="verticla"/>
                          <a href="javascript:;">查看日志</a>
                    </span>
                )
            }
        }];


        return (
            <Template>
                <Table
                    style={{backgroundColor: '#fff'}}
                    rowKey={record => record.guid }
                    columns={columns}
                    dataSource={data}
                    size="middle"
                    loading={this.state.loading}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
                <Layer ref="layer" title="添加附件" hasState >
                    <UploadForm/>
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


export default connect(mapStateToProps, mapDispatchToProps)(TransferredList)