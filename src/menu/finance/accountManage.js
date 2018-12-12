import React, { Component } from 'react';
import Template from '../../common/template';
import { Table } from 'antd';

const columns = [{
    title: '账号',
    dataIndex: 'name',
}, {
    title: '收付款方式',
    dataIndex: 'payment_id',
},{
    title: '账号管理者',
    dataIndex: 'uuid',
},{
    title: '备注说明',
    dataIndex: 'desc',
},{
    title: '账号余额',
    dataIndex: 'balance_price',
},{
    title: '操作',
}];

const data = [];


class AccountManage extends Component {
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

export default AccountManage