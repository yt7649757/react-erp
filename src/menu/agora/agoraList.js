import React, { Component } from 'react';
import Template from '../../common/template';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../redux/action/agora/agora';
import TableComponent from '../../component/tableComponent';
import { Input, Button } from 'antd';
const Search = Input.Search;

class AgoraList extends Component {
    render() {
        const url = `/api/erp/statistics/marketdatanowmonth`

        const columns = [{
            title: '部门',
            dataIndex: 'department.department_name',
        },{
            title: '姓名',
            dataIndex: 'name',
        },{
            title: '总客户量',
            dataIndex: 'sum',
        },{
            title: '签单量',
            dataIndex: 'success',
        },{
            title: '废单量',
            dataIndex: 'false',
        },{
            title: '未完成',
            dataIndex: 'now',
        },{
            title: '签单转化率',
            dataIndex: 'rate',
        }];

        return (
            <Template>
                <div style={{marginBottom: '10px'}}>
                    <Search
                        placeholder="请输入姓名"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                    />
                    <Button>显示全部</Button>
                </div>
                <TableComponent columns={columns} url={url} size="middle" />
            </Template>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        agora: state.agora,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        agoraActions: bindActionCreators(AgoraActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AgoraList)