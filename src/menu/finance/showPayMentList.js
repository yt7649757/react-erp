import React, { Component } from 'react';
import Template from '../../common/template';
import { Table } from 'antd';

const columns = [{
    title: '付款方式',
    dataIndex: 'name',
}, {
    title: '备注说明',
    dataIndex: 'desc',
}, {
    title: '操作',
    render: () => {
        return (
            <a href="javascript:;">删除</a>
        )
    }
}];

const data = [];

class ShowPayMentList extends Component {
    render() {
        return (
            <Template>
                <Table columns={columns} dataSource={data} />
            </Template>
        )
    }
}

export default ShowPayMentList