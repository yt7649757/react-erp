import React, { Component } from 'react';
import { Table } from 'antd';

const columns = [{
    title: '文件名称',
    dataIndex: 'field_name',
    key: 'field_name',
}, {
    title: '上传者',
    dataIndex: 'uuid_name',
    key: 'uuid_name',
},{
    title: '文件描述',
    dataIndex: 'field_desc',
    key: 'field_desc',
},{
    title: '操作'
}];

const dataSource = []

class ProjectPaper extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Table dataSource={dataSource} columns={columns}  size="small" />
        )
    }
}

export default ProjectPaper