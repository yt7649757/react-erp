import React, { Component } from 'react';
import { Table } from 'antd';

const columns = [{
    title: '提醒时间',
    dataIndex: 'remind_time',
    key: 'remind_time',
}, {
    title: '提醒内容',
    dataIndex: 'remind_content',
    key: 'remind_content',
},{
    title: '添加者',
    dataIndex: 'name',
    key: 'name',
}];

const dataSource = []

class RemindInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Table dataSource={dataSource} columns={columns}  size="small" />
        )
    }
}

export default RemindInfo