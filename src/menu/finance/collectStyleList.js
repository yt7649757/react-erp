import React, { Component } from 'react';
import Template from '../../common/template';

import { Table } from 'antd';

const columns = [{
    title: '收款类型名称',
    dataIndex: 'collect_name',
}, {
    title: '备注说明',
    dataIndex: 'desc',
}, {
    title: '操作',
    render: () => {
        return (
            <a href="">删除</a>
        )
    }
}];

const data = [];

class CollectStyleList extends Component {
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

export default CollectStyleList