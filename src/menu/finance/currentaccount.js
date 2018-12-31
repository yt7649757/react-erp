import React, { Component } from 'react';
import Template from '../../common/template';
import { Button, DatePicker } from 'antd';
import TableComponent from '../../component/tableComponent';

const { RangePicker } = DatePicker

class Currentaccount extends Component {
    // constructor(props) {
    //     super(props)
    // }

    onChange = () => {

    }

    render() {

        const columns = [{
            title: '',
            dataIndex: ''
        },{
            title: '日期',
            dataIndex: 'create_time'
        },{
            title: '凭证号',
            dataIndex: 'number'
        },{
            title: '对方科目',
            dataIndex: 'collect_type_name'
        },{
            title: '工地名称',
            dataIndex: 'project_name'
        },{
            title: '摘要',
            dataIndex: 'desc'
        },{
            title: '申请人',
            dataIndex: 'collect_uuid_name'
        },{
            title: '收款人',
            dataIndex: 'collected_uuid_name'
        },{
            title: '项目',
            dataIndex: 'transaction_type'
        },{
            title: '收付款方式',
            dataIndex: 'payment_name'
        },{
            title: '借方',
            dataIndex: 'collect_price'
        },{
            title: '贷方',
            dataIndex: 'no_collect_price'
        },{
            title: '结余',
            dataIndex: 'out_come'
        },{
            title: '实收(借方)',
            dataIndex: 'income_price'
        },{
            title: '实付(借方)',
            dataIndex: 'expenditure_price'
        },{
            title: '实(结余)',
            dataIndex: 'balance_price'
        }]

        return(
            <Template>
                <div style={{marginBottom: 20}}>
                    <Button type="primary">新增收付款(日常)</Button>
                    <span style={{marginRight: '10px',marginLeft: '10px'}}>搜索条件:</span>
                    <span style={{marginRight: '10px'}}>交易时间:</span>
                    <RangePicker onChange={this.onChange} />
                    <Button style={{marginLeft: '10px'}}>显示全部</Button>
                    <Button icon="export" style={{marginLeft: '10px'}}>导出</Button>
                </div>
                <TableComponent
                    columns={columns}
                    size="middle"
                />
            </Template>
        )
    }
}

export default Currentaccount