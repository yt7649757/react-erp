import React, { Component } from 'react';
import Template from '../../common/template'
import { Table } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SystemManageActions from '../../redux/action/system/systemManage'

const columns = [{
    title: '用户昵称',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
}, {
    title: '用户登录情况',
    dataIndex: 'desc',
    filters: [
        { text: '全部', value: '1' },
        { text: '已删除', value: '2' },
        { text: '禁用', value: '3' },
        { text: '正常', value: '4' },
    ],
    filterMultiple: false,
}, {
    title: '状态',
    dataIndex: 'status',
    render: function (text,record,index) {
       return record.status == 1? '正常' : '非正常'
    }
},{
    title: '创建时间',
    dataIndex: 'create_time'
}];


class UserLoginList extends Component {

    state = {
        data: [],
        pagination: {pageSize:15},
        loading: false,
    };

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
    }

    componentDidMount() {
        this.props.systemManageActions.getUserLogin(1,15)
    }

    render() {
        const { data } = this.props.systemManage.userLoginList;
        return (
            <Template>
                <Table
                    style={{backgroundColor: '#fff'}}
                    columns={columns}
                    dataSource={data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
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


export default connect(mapStateToProps,mapDispatchToProps)(UserLoginList)