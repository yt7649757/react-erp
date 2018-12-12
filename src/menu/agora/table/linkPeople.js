import React, { Component } from 'react';
import { Table } from 'antd';

const columns = [{
    title: '姓名',
    dataIndex: 'contact_name',
    key: 'contact_name',
}, {
    title: '年龄',
    dataIndex: 'sex',
    key: 'sex',
}, {
    title: '联系电话',
    dataIndex: 'contact_number',
    key: 'contact_number',
},{
    title: 'QQ',
    dataIndex: 'customer_qq',
    key: 'customer_qq',
},{
    title: 'Email',
    dataIndex: 'customer_email',
    key: 'customer_email',
},{
    title: '与户主关系',
    dataIndex: 'householder_relation',
    key: 'householder_relation',
}];

const dataSource = []

class LinkPeople extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Table dataSource={dataSource} columns={columns}  size="small" />
        )
    }
}

export default LinkPeople