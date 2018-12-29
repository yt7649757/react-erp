import React, { Component } from 'react';
import { Table, DatePicker  } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as FinanceActions from '../../../redux/action/finance/finance';

const { RangePicker } = DatePicker;

let data = null
class PayTable extends Component {

    constructor(props) {
        super(props)
        this.state= {
            pagination: {

            }
        }
    }

    onChange = (date, dateString) => {
        console.log(date, dateString)
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

        const { url } = this.props;

        pagination.pageSize = this.props.pageSize ||  10;
        this.setState({
            loading: true
        })

        // let res = await this.props.tableActions.getTableList(url,params,pagination.pageSize)
        //
        // if(res) {
        //     pagination.total = res.data.total;
        //
        //     pagination.showTotal = function (total) {
        //         return `总共有${total}条数据`
        //     }
        //
        //     this.setState({
        //         pagination,
        //         loading: false
        //     })
        // }
    }

    componentDidMount() {
        this.request()
    }

    render() {
        // const columns = [{
        //     title: '资金说明',
        //     dataIndex: 'desc'
        // },{
        //     title: '收入金额',
        //     dataIndex: 'income_price'
        // },{
        //     title: '交易时间',
        //     dataIndex: 'create_time'
        // },{
        //     title: '审核人',
        //     dataIndex: 'name'
        // }]
        //
        // const data = []

        const { url, columns, size } = this.props

        if(!url) {
            data = []
        }

        return (
            <div>
                <div style={{marginBottom: '20px'}}>
                    <span style={{marginRight: '10px'}}>搜索条件:</span>
                    <span style={{marginRight: '10px'}}>交易时间:</span>
                    <RangePicker onChange={this.onChange} />
                </div>
                <Table
                    rowKey={record => record.guid}
                    columns={columns}
                    dataSource={data}
                    size={size}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        )
    }
}

PayTable.defaultProps = {
    size: 'small'
}

const mapStateToProps = (state) => {
    return {
        finance: state.finance,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        financeActions: bindActionCreators(FinanceActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PayTable)