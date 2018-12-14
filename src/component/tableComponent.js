import React, { Component } from 'react';
import { Table } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tableActions from '../redux/action/table';

let data = [];
class TableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            pagination: {
                showQuickJumper: true
            }
        };
    }


    // 页码改变的回调，参数是改变后的页码及每页条数 Function(page, pageSize)
    handleTableChange = (pagination) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.request(pager.current, pager.pageSize)
    }

    request = async(params = 1) => {
        const pagination = { ...this.state.pagination };

        const url = this.props.url;

        pagination.pageSize = 10;
        this.setState({
            loading: true
        })

        let res = await this.props.tableActions.getTableList(url,params,pagination.pageSize)
        console.log(res);

        if(res) {
            pagination.total = res.data.total;

            pagination.showTotal = function (total) {
                return `总共有${total}条数据`
            }

            this.setState({
                pagination,
                loading: false
            })
        }


    }


    componentDidMount() {
        this.request()
    }



    onSelectChange = (selectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    render() {
        const { loading } = this.state;
        const { columns, url } = this.props;


        if(this.props.table.tableList[url]) {
            data = this.props.table.tableList[url].data
            console.log(data);
        }

        return (
            <Table
                // rowSelection={rowSelection}
                rowKey={record => record.id}
                columns={columns}
                loading={loading}
                dataSource={data}
                pagination={this.state.pagination}
                onChange={this.handleTableChange}
                size='small'
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        table: state.table,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tableActions: bindActionCreators(tableActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
