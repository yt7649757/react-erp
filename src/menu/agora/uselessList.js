import React, { Component } from 'react';
import Template from '../../common/template';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../redux/action/agora/agora';

import { Table } from 'antd';

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
            <a href="javascript:void(0);">审核</a>
        )
    }
}];

let current = 1;

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

            pagination.showTotal = function (total) {
                return `总共有${total}条数据`
            }
            console.log(columns)
            this.setState({
                pagination,
                loading: false,
            })
        }else {
            alert('加载出错')
        }

    }



    render() {

        const { data } = this.props.agora.useLessList

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


export default connect(mapStateToProps, mapDispatchToProps)(UselessList)