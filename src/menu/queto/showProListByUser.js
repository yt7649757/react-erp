import React, { Component } from 'react';
import Template from '../../common/template';
import { Table } from 'antd';

const columns = [{
    title: '项目名称',
    dataIndex: 'project_name',
}, {
    title: '定金',
    dataIndex: 'payment_phase',
},{
    title: '装修面积',
    dataIndex: 'decoration_area',
},{
    title: '工程预算',
    dataIndex: 'project_budget',
},{
    title: '跟踪人员',
    dataIndex: 'tracking_name',
},{
    title: '设计进度',
    dataIndex: 'design_schedule'
},{
    title: '项目预算',
    dataIndex: 'budget'
},{
    title: '操作'
}]

const data = [];


class ShowProListByUser extends Component {
    render() {
        return (
            <Template>
                <Table columns={columns} dataSource={data} />
            </Template>
        )
    }
}

export default ShowProListByUser