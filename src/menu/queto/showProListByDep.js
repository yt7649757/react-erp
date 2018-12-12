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
    title: '所属部门',
    dataIndex: 'design_department_name',
},{
    title: '跟踪人员',
    dataIndex: 'tracking_name',
},{
    title: '转部状态',
    dataIndex: 'transfer_status',
},{
    title: '转部说明',
    dataIndex: 'transfer_desc',
},{
    title: '审核状态',
    dataIndex: 'examine_status',
},{
    title: '审核说明',
    dataIndex: 'examine_desc',
},{
    title: '操作',
}];

const data = [];


class ShowProListByDep extends Component {
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

export default ShowProListByDep