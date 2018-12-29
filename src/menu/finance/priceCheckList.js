import React, { Component } from 'react';
import Template from '../../common/template';
import TableComponent from '../../component/tableComponent';
import { Input } from 'antd';
import CreateTab from '../../utils/createTab';

const Search = Input.Search;

class PriceCheckList extends Component {

    look = (params) => {
        const url = `erp/finance/lookbuildfinance/guid/${params.guid}`;
        new CreateTab(url,{
            guid: `xmgc`,
            menu_name: '项目工程',
            url: url
        }).create()
        this.props.history.push('/' + url)
    }

    render() {

        const columns = [{
            title: '项目名称',
            dataIndex: 'project_name',
        }, {
            title: '工程地址',
            dataIndex: 'project_address',
        },{
            title: '施工开始日期',
            dataIndex: 'build_time',
        },{
            title: '施工结束日期',
            dataIndex: 'build_end_time',
        },{
            title: '施工总天数',
            dataIndex: 'build_days',
        },{
            title: '操作',
            render: (text,record) => {
                return (
                    <a href="javascript:;" onClick={() => this.look(text)}>查看工程</a>
                )
            }
        }];


        return (
            <Template>
                <div style={{marginBottom: '20px'}}>
                    <span style={{marginRight: '10px'}}>搜索条件:</span>
                    <span style={{marginRight: '10px'}}>项目名称:</span>
                    <Search
                        onSearch={this.search}
                        style={{ width: 200 }}
                        enterButton
                    />
                </div>
                <TableComponent
                    columns={columns}
                    size="middle"
                    testUrl="https://www.easy-mock.com/mock/5c185df39172fa10e61b63b3/erp/erp/Finance/showProjectPriceCheck"
                />
            </Template>
        )
    }
}

export default PriceCheckList