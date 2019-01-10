import React, { Component } from 'react';
// import Template from '../../common/template';
// import { Table } from 'antd';
import TableComponent from '../../component/tableComponent';


const columns = [{
    title: '项目名称',
    dataIndex: 'project_name',
}, {
    title: '申请人',
    dataIndex: 'name',
},{
    title: '申请说明',
    dataIndex: 'apply_desc',
},{
    title: '操作',
}];

const data = [];

class CollectCheck extends Component {
    render() {
        return (
            <div>
                <TableComponent
                    columns={columns}
                    size="middle"
                />
            </div>
        )
    }
}

export default CollectCheck