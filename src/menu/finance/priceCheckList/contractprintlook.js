import React, { Component } from 'react';
import Template from '../../../common/template';
import TableComponent from '../../../component/tableComponent';

class Contractprintlook extends Component {
    render() {
        const columns = [{
            title: '序号',
            dataIndex: 'xuhao'
        },{
            title: '工程名称',
            dataIndex: 'name'
        },{
            title: '单位',
            dataIndex: 'unit'
        },{
            title: '数量',
            dataIndex: 'number'
        },{
            title: '单价',
            dataIndex: 'control_price'
        },{
            title: '金额',
            dataIndex: 'price_sum'
        },{
            title: '说明',
            dataIndex: 'desc'
        }]
        return (
            <Template>
                <TableComponent
                    columns={columns}
                    size="middle"
                />
            </Template>
        )
    }
}
export default Contractprintlook