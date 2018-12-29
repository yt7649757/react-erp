import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tableActions from '../redux/action/table';

/**
 *
 * @type {Array}
 *
 * url 请求的接口
 * testUrl 测试的接口
 * columns table表头
 * size table大小
 * checkbox 是否需要选择框
 * getRowSelection 获取选中的值
 */

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

let i = 0
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

        const { url,testUrl } = this.props;

        pagination.pageSize = this.props.pageSize ||  10;
        this.setState({
            loading: true
        })

        let res = ''
        if(url) {
            res = await this.props.tableActions.getTableList(url,params,pagination.pageSize)
        }else if(testUrl) {
            res = await this.props.tableActions.getEasyMock(testUrl)
        }

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
        if(this.props.url || this.props.testUrl) {
            this.request()
        }
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return false
        }
    }


    onSelectChange = (selectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }


    render() {
        console.log(i++);
        const { loading } = this.state;
        const { columns, url, testUrl } = this.props;

        if(url && this.props.table.tableList[url]) {
            data = this.props.table.tableList[url].data
        }else if(testUrl && this.props.table.tableList[testUrl]) {
            data = this.props.table.tableList[testUrl].data
        }else {
            data = []
        }


        const rowSelection  = {
            onChange: (selectedRowKeys, selectedRows) => {
                 this.props.getRowSelection(selectedRowKeys, selectedRows)
            }
        }


        return (
            <Table
                style={{backgroundColor:"#fff"}}
                // rowSelection={rowSelection}
                rowKey={record => record.id || record.guid || guid()}
                columns={columns}
                loading={loading}
                dataSource={data}
                rowSelection={this.props.checkbox? rowSelection: null}
                pagination={this.state.pagination}
                onChange={this.handleTableChange}
                size={this.props.size}
                title={this.props.title}
            />
        );
    }
}

TableComponent.defaultProps = {
    size: 'small'
}


TableComponent.propTypes = {
    columns: PropTypes.array,
    url: PropTypes.string,
    size: PropTypes.string,
    checkbox: PropTypes.bool,
    title: PropTypes.func
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
