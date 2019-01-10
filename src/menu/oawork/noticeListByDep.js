import React, { Component } from 'react';
// import Template from '../../common/template';
import { Button } from 'antd';
import TableComponent from '../../component/tableComponent';

class NoticeListByDep extends Component {
    render() {
        const columns = [{
            title: '',
            dataIndex: 'key'
        },{
            title: '标题',
            dataIndex: 'title'
        },{
            title: '发布时间',
            dataIndex: 'create_time'
        },{
            title: '公告类型',
            dataIndex: 'type'
        },{
            title: '发布者',
            dataIndex: 'name'
        },{
            title: '发布者职位',
            dataIndex: 'jobs_name'
        },{
            title: '操作'
        }]

        return(
            <div>
                <div className="operate">
                    <Button type="danger">删除公告</Button>
                    <Button>刷新</Button>
                    <Button>回收站</Button>
                    <Button>显示全部</Button>
                </div>
                <TableComponent
                    columns={columns}
                    checkbox={true}
                    size="middle"
                />
            </div>
        )
    }
}

export default NoticeListByDep