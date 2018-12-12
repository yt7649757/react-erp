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
    title: '项目预算',
    dataIndex: 'budget',
},{
    title: '申请人',
    dataIndex: 'transfer_name',
},{
    title: '申请说明',
    dataIndex: 'desc',
},{
    title: '操作',
}];

const data = [];


class ShowProjectContAudit extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Template>
                <Table columns={columns} dataSource={data} />
            </Template>
        )
    }
}

export default ShowProjectContAudit