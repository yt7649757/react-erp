import React, { Component } from 'react';
import Template from '../../common/template';
import { Table, Button } from 'antd';

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
    render() {
        return (
            <Template>
                <div className="operate">
                    <Button type="primary">添加作品</Button>
                    <Button>修改作品</Button>
                    <Button type="danger">删除作品</Button>
                </div>
                <Table columns={columns} dataSource={data} />
            </Template>
        )
    }
}

export default ExcellentOpus