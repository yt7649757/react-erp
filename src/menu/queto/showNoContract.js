import React, { Component } from 'react';
import Template from '../../common/template';
import { Table } from 'antd';

const columns = [{
    title: '账号',
    dataIndex: 'book_number',
}, {
    title: '项目名称',
    dataIndex: 'project_name',
},{
    title: '项目预算',
    dataIndex: 'budget',
},{
    title: '操作',
}];

const data = [];


class ShowNoContract extends Component {
    render() {
        return (
            <Template>
                <Table columns={columns} dataSource={data} />
            </Template>
        )
    }
}

export default ShowNoContract