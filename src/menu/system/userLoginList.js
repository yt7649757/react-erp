import React, {Component} from 'react';
import Template from '../../common/template'
import {Table} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SystemManageActions from '../../redux/action/system/systemManage'

class UserLoginList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: [],
            pagination: {
                showQuickJumper: true
            },
            loading: false,
        }
    }

    componentWillReceiveProps(nextProps) {
         this.setState({
             current: nextProps.systemManage.userLoginList.current_page,
             total: nextProps.systemManage.userLoginList.total
         })
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
        pagination.pageSize = 10
        this.setState({
            loading: true
        })
        var res = await this.props.systemManageActions.getUserLogin(params,pagination.pageSize)

        pagination.total = res.data.total;
        pagination.current = params;

        pagination.showTotal = function (total) {
            return `总共有${total}条数据`
        }

        console.log(pagination);

        this.setState({
            pagination,
            loading: false
        })
    }


    componentDidMount() {
       this.request()
    }

    render() {
        const pagination = this.state.pagination.current ? this.state.pagination.current : 1
        const pageSize = this.state.pagination.pageSize ? this.state.pagination.pageSize : 0
        const columns = [{
            title: '',
            render:(text,record,index)=> {
                return(
                    <span>{(pagination-1)* pageSize + index + 1}</span>
                )
            },
            key: 'key'

        },{
            title: '用户昵称',
            dataIndex: 'personnel_user.name',
            sorter: true,
            width: '20%',
        }, {
            title: '用户登录情况',
            dataIndex: 'desc',
            filters: [
                {text: '全部', value: '1'},
                {text: '已删除', value: '2'},
                {text: '禁用', value: '3'},
                {text: '正常', value: '4'},
            ],
            filterMultiple: false,
        }, {
            title: '状态',
            dataIndex: 'status',
            render: function (text, record, index) {
                return record.status == 1 ? '正常' : '已刪除'
            }
        }, {
            title: '创建时间',
            dataIndex: 'create_time'
        }];


        const {data} = this.props.systemManage.userLoginList;
        return (
            <Template>
                <Table
                    rowKey={record => record.id}
                    style={{backgroundColor: '#fff'}}
                    columns={columns}
                    dataSource={data}
                    loading = {this.state.loading}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                    size="middle"
                />
            </Template>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        systemManage: state.systemManage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        systemManageActions: bindActionCreators(SystemManageActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserLoginList)