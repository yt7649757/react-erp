import React, { Component } from 'react';
// import Template from '../../../common/template';
import { Divider } from 'antd';
import PayTable from '../contractDetail/payTable';

class TransationRecord  extends Component {
    render() {

        const columns = [{
            title: '账号',
            dataIndex: 'bank_id'
        },{
            title: '收入金额',
            dataIndex: 'income_price'
        },{
            title: '支出金额',
            dataIndex: 'expenditure_price'
        },{
            title: '剩余金额',
            dataIndex: 'balance_price'
        },{
            title: '资金说明',
            dataIndex: 'desc'
        },{
            title: '交易时间',
            dataIndex: 'create_time'
        },{
            title: '审核人',
            dataIndex: 'name'
        }]

        return (
            <div>
                <Divider orientation="left">交易记录列表</Divider>
                <PayTable
                    columns={columns}
                    size="middle"
                />
            </div>
        )
    }
}

export default TransationRecord