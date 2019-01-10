import React, { Component } from 'react';
// import Template from '../../../common/template';
import TableComponent from '../../../component/tableComponent';

class EngineeringDetail extends Component {

    render() {
        const columns = [{
            title: '',
            dataIndex: 'id'
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
            dataIndex: 'price_num'
        },{
            title: '说明',
            dataIndex: 'desc'
        }]

        return (
            <div>
                <TableComponent
                    title={() => '标题'}
                    columns={columns}
                    size="middle"
                />
            </div>
        )
    }
}

export default EngineeringDetail