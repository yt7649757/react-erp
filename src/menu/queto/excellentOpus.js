import React, { Component } from 'react';
import Template from '../../common/template';
import { Table } from 'antd';

const columns = [{
    title: '作品名称',
    dataIndex: 'photo_name',
}, {
    title: '添加时间',
    dataIndex: 'create_time',
},{
    title: '备注',
    dataIndex: 'desc',
},{
    title: '作品',
}];

const data = [];


class ExcellentOpus extends Component {
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

export default ExcellentOpus