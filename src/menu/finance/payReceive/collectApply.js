import React, { Component } from 'react';
import TableComponent from '../../../component/tableComponent';

class CollectApply extends Component {
    render() {

        const columns = [{
            title: '凭证号',
            dataIndex: 'number'
        },{
            title: '付款金额(元)',
            dataIndex: 'collect_price'
        },{
            title: '剩余金额(元)',
            dataIndex: 'price'
        },{
            title: '款项名称',
            dataIndex: 'collect_name'
        },{
            title: '计划收款时间',
            dataIndex: 'collect_date'
        },{
            title: '申请人',
            dataIndex: 'collect_uuid_name'
        },{
            title: '审核人',
            dataIndex: 'examine_uuid_name'
        },{
            title: '审核说明',
            dataIndex: 'examine_desc'
        },{
            title: '操作',
        }]


        return (
            <TableComponent
                columns={columns}
                size="small"
            />
        )
    }
}

export default CollectApply