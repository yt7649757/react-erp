import React, { Component } from 'react';
import { Table } from 'antd';

const columns = [{
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
}, {
    title: '部门',
    dataIndex: 'department_name',
    key: 'department_name',
}, {
    title: '职位',
    dataIndex: 'jobs_name',
    key: 'jobs_name',
},{
    title: '跟踪内容',
    dataIndex: 'log_content',
    key: 'log_content',
},{
    title: '时间',
    dataIndex: 'create_time',
    key: 'create_time',
}];

const dataSource = []

class TrackingLog extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Table dataSource={dataSource} columns={columns}  size="small" />
        )
    }
}

export default TrackingLog