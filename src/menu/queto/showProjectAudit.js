import React, { Component } from 'react';
import Template from '../../common/template';
import { Table } from 'antd';

const columns = [{
    title: '项目名称',
    dataIndex: 'project_name',
}, {
    title: '申请人',
    dataIndex: 'name',
},{
    title: '申请人所在部门',
    dataIndex: 'department_name',
},{
    title: '申请人转入的部门',
    dataIndex: 'into_department_name',
},{
    title: '申请说明',
    dataIndex: 'transfer_desc',
},{
    title: '操作',
}];

const data = [];


class ShowProjectAudit extends Component {
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

export default ShowProjectAudit