import React, { Component } from 'react';
import Template from '../../common/template';
import TableComponent from '../../component/tableComponent';
import CreateTab from '../../utils/createTab';
import { Table,Divider } from 'antd';

class ShowContractProjectList extends Component {

    look = (params) => {
        const url = `erp/design/showbudgetbook/guid/${params.guid}`;
        new CreateTab(url,{
            guid: `llys`,
            menu_name: '报价表',
            url: url
        }).create()
        this.props.history.push('/' + url)
    }

    lookProgress = (params) => {
        const url = `erp/design/showbudgethtml/guid/${params.guid}`;
        new CreateTab(url,{
            guid: `sjjd`,
            menu_name: '设计进度',
            url: url
        }).create()
        this.props.history.push('/' + url)
    }

    lookProject = (params) => {
        const url = `erp/project/showprojectofuser/guid/${params}`;
        new CreateTab(url, {
            guid: 'xmmx',
            menu_name: `项目明细`,
            url: url
        }).create()
        this.props.history.push('/' + url)
    }

    lookPay = (params) => {
        const url = `erp/finance/collectionplan/guid/${params}`;
        new CreateTab(url, {
            guid: 'xmmx',
            menu_name: `收款`,
            url: url
        }).create()
        this.props.history.push('/' + url)
    }


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
            render: (text,record) => {
                return (
                    <span>
                    <a href="javascript:;" onClick={() => this.lookProgress(record)}>设计进度</a>
                    </span>
                )
            }
        },{
            title: '项目预算',
            dataIndex: 'budget',
            render: (text,record) => {
                return (
                    <span>
                    <a href="javascript:;" onClick={() => this.look(record)}>浏览预算</a>
                    </span>
                )
            }
        }, {
            title: '操作',
            render: (text,record) => {
                return (
                    <span>
                    <a href="javascript:;" onClick={() => this.lookProject(text.guid)}>查看</a>
                        <Divider type="verticla"/>
                          <a href="javascript:;" onClick={() => this.lookPay(text.guid)}>收付款</a>
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
        }];


        return (
            <Template>
                <TableComponent
                    columns={columns}
                    size="middle"
                    testUrl="https://www.easy-mock.com/mock/5c185df39172fa10e61b63b3/erp/showContractProjectList"
                />
            </Template>
        )
    }
}

export default ShowContractProjectList