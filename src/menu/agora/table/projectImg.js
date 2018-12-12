import React, { Component } from 'react';
import { Table } from 'antd';

const columns = [{
    title: '图片名称',
    dataIndex: 'photo_name',
    key: 'photo_name',
}, {
    title: '上传者',
    dataIndex: 'uuid_name',
    key: 'uuid_name',
},{
    title: '图片描述',
    dataIndex: 'photo_desc',
    key: 'photo_desc',
},{
    title: '操作'
}];

const dataSource = []

class ProjectImg extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Table dataSource={dataSource} columns={columns}  size="small" />
        )
    }
}

export default ProjectImg