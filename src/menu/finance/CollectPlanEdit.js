import React, { Component } from 'react';
import Template from '../../common/template';
import { Table } from 'antd';

const columns = [{
    title: '名称',
    dataIndex: 'collect_plan_name',
}, {
    title: '备注说明',
    dataIndex: 'desc',
},{
    title: '操作',
}];

const data = [];


class CollectPlanEdit extends Component {
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

export default CollectPlanEdit