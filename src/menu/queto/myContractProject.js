import React, { Component } from 'react';
import Template from '../../common/template';
import { Table, Divider } from 'antd';


class MyContractProject extends Component {
    render() {
        const columns = [{
            title: '预算书编号',
            dataIndex: 'book_number',
        }, {
            title: '项目名称',
            dataIndex: 'project_name',
        },{
            title: '跟踪人员',
            dataIndex: 'tracking_name',
        },{
            title: '设计进度',
            dataIndex: 'design_schedule',
        },{
            title: '项目预算',
            dataIndex: 'budget',
        },{
            title: '已收款',
            dataIndex: 'price_num',
        },{
            title: '操作',
            render: () => {
                return (
                    <span>
                    <a href="javascript:;">查看</a>
                        <Divider type="verticla"/>
                          <a href="javascript:;">收付款</a>
                            <Divider type="verticla"/>
                          <a href="javascript:;">项目日志</a>
                    </span>
                )
            }
        }];

        const data = [{
            book_number: '123',
            project_name: '测试',
            tracking_name: '',
            design_schedule: '100%',
            budget: 10000,
            price_num: 10000
        }];



        return (
            <Template>
                <Table columns={columns} dataSource={data} />
            </Template>
        )
    }
}

export default MyContractProject