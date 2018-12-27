import React, { Component } from 'react';
import TableComponent from '../../../component/tableComponent';

class ActualCollect extends Component {
    render() {

        const columns = [{
            title: '凭证号',
            dataIndex: 'number'
        },{
            title: '收款金额',
            dataIndex: 'collect_price'
        },{
            title: '款项名称',
            dataIndex: 'collect_name'
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
            title: '收款人',
            dataIndex: 'collected_uuid_name'
        },{
            title: '收款说明',
            dataIndex: 'collect_desc'
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

export default ActualCollect