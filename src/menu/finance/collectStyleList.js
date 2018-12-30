import React, { Component } from 'react';
import Template from '../../common/template';
import TableComponent from '../../component/tableComponent';
import TableHOC from '../../component/tableHoc';
// import { Table } from 'antd';

class CollectStyleList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nochecked: true
        }
    }

    deleteRow = (param) => {
        alert(param.guid)
    }

    render() {

        const columns = [{
            title: '收款类型名称',
            dataIndex: 'collect_name',
        }, {
            title: '备注说明',
            dataIndex: 'desc',
        }, {
            title: '操作',
            render: (text) => {
                return (
                    <a href="javascript:;" onClick={() => this.props.showConfirm(text)}>删除</a>
                )
            }
        }];

        return (
            <Template>
                <TableComponent
                    columns={columns}
                    size="middle"
                    url="/api/erp/finance/collectstylelist"
                />
            </Template>
        )
    }
}

export default TableHOC(CollectStyleList)