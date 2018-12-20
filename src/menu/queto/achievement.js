import React, { Component } from 'react';
import Template from '../../common/template';
import { Table } from 'antd';

const columns = [{
    title: '部门',
    dataIndex: 'department_name',
}, {
    title: '姓名',
    dataIndex: 'name',
},{
    title: '总客户量',
    dataIndex: 'sum',
},{
    title: '签单量',
    dataIndex: 'success',
},{
    title: '废单量',
    dataIndex: 'false',
},{
    title: '未完成',
    dataIndex: 'now',
},{
    title: '签单转化率',
    dataIndex: 'rate',
}];

const data = [];


class Achievement  extends Component {
    render() {
        return (
            <Template>
                <Table columns={columns} dataSource={data} />
            </Template>
        )
    }
}

export default Achievement