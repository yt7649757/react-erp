import React, { Component } from 'react';
import Template from '../../common/template';
import { Table } from 'antd';
import TableComponent from '../../component/tableComponent';

const columns = [{
    title: '项目名称',
    dataIndex: 'project_name',
}, {
    title: '支付方式',
    dataIndex: 'payment_name',
},{
    title: '定金单录入者',
    dataIndex: 'payment_uuid_name',
},{
    title: '付款金额',
    dataIndex: 'payment_price',
},{
    title: '付款日期',
    dataIndex: 'payment_date',
},{
    title: '录入时间',
    dataIndex: 'create_time',
}];

const data = [];


class ShowProjectDepositList extends Component {
    render() {
        return (
            <Template>
                <TableComponent
                    columns={columns}
                    size="midddle"
                />
            </Template>
        )
    }
}

export default ShowProjectDepositList