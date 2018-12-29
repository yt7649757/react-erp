import React, { Component } from 'react';
import Template from '../../common/template';
import { Table, Input, Button } from 'antd';
import CreateTab from '../../utils/createTab';
import TableComponent from '../../component/tableComponent';
const Search = Input.Search;

class ContractDetail extends Component {

    look = (params) => {
        const url = `erp/finance_project_price/lookprojectmore/guid/${params.guid}`;
        new CreateTab(url,{
            guid: `xmszmx`,
            menu_name: '项目收支明细',
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
            title: '已收款',
            dataIndex: 'price_num',
        },{
            title: '操作',
            render: (text,record) => {
                return (
                    <span>
                <a href="javascript:void(0);" onClick={() => this.look(text)}>收支明细</a>
            </span>
                )
            }
        }];

        return (
            <Template>
                <div style={{marginBottom: '10px'}}>
                    <Search
                        placeholder="请输入编号"
                        onSearch={this.search}
                        style={{ width: 200 }}
                        enterButton
                    />
                    <Button style={{marginLeft: '10px', verticalAlign: 'top'}}>显示全部</Button>
                </div>
                <TableComponent
                    columns={columns}
                    size="middle"
                    testUrl="https://www.easy-mock.com/mock/5c185df39172fa10e61b63b3/erp/erp/FinanceProjectPrice/showProjectList"
                />
            </Template>
        )
    }
}

export default ContractDetail