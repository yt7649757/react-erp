import React, { Component } from 'react';
import Template from '../../common/template';
import { Table } from 'antd';

const columns = [{
    title: '项目名称',
    dataIndex: 'project_name',
}, {
    title: '工程地址',
    dataIndex: 'project_address',
},{
    title: '施工开始日期',
    dataIndex: 'build_time',
},{
    title: '施工结束日期',
    dataIndex: 'build_end_time',
},{
    title: '施工总天数',
    dataIndex: 'build_days',
},{
    title: '操作'
}];

const data = [];

class PriceCheckList extends Component {
    render() {
        return (
            <Template>
                <Table columns={columns} dataSource={data} />
            </Template>
        )
    }
}

export default PriceCheckList