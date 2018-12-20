import React, { Component } from 'react';
import Template from '../../common/template';

import { Table } from 'antd';

const columns = [{
    title: '预算书编号',
    dataIndex: 'book_number',
}, {
    title: '项目名称',
    dataIndex: 'project_name',
},{
    title: '跟踪人员',
    dataIndex: 'tracking_name',
},{
    title: '设计进度',
    dataIndex: 'design_schedule',
},{
    title: '项目预算',
    dataIndex: 'budget',
}, {
    title: '操作',
    render: () => {
        return (
            <a href="">删除</a>
        )
    }
}];

const data = [];

class ShowContractProjectList extends Component {
    render() {
        return (
            <Template>
                <Table columns={columns} dataSource={data} />
            </Template>
        )
    }
}

export default ShowContractProjectList