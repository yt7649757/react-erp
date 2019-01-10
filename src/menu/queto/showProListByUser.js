import React, { Component } from 'react';
// import Template from '../../common/template';
import { Table,Button } from 'antd';

const columns = [{
    title: '项目名称',
    dataIndex: 'project_name',
}, {
    title: '定金',
    dataIndex: 'payment_phase',
},{
    title: '装修面积',
    dataIndex: 'decoration_area',
},{
    title: '工程预算',
    dataIndex: 'project_budget',
},{
    title: '跟踪人员',
    dataIndex: 'tracking_name',
},{
    title: '设计进度',
    dataIndex: 'design_schedule'
},{
    title: '项目预算',
    dataIndex: 'budget'
},{
    title: '操作'
}]

const data = [];


class ShowProListByUser extends Component {
    render() {
        return (
            <div>
                <div className="operate">
                    <Button type="primary">添加预算</Button>
                    <Button type="primary">添加定金单</Button>
                    <Button>显示更多信息</Button>
                    <Button>隐藏更多信息</Button>
                    <Button>显示转部信息</Button>
                    <Button>隐藏转部信息</Button>
                </div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}

export default ShowProListByUser