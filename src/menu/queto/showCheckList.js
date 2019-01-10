import React, { Component } from 'react';
// import Template from '../../common/template';
import { Table } from 'antd';

const columns = [{
    title: '项目名称',
    dataIndex: 'project_name',
}, {
    title: '申请人',
    dataIndex: 'apply_name',
},{
    title: '申请理由',
    dataIndex: 'apply_desc',
},{
    title: '操作',
}];

const data = [];


class ShowCheckList extends Component {
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}

export default ShowCheckList