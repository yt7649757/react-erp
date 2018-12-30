import React, {Component} from 'react';
import TableComponent from '../component/tableComponent';

class Log extends Component {
    render() {

        const columns = [
            {
                title: '姓名',
                dataIndex: 'user.username',
            }, {
                title: '部门',
                dataIndex: 'department.department_name',
            }, {
                title: '职位',
                dataIndex: 'jobs.jobs_name',
            }, {
                title: '跟踪内容',
                dataIndex: 'log_content',
                width: '30%',
                render: (text) => <span className="col-sql">{text}</span>,
            }, {
                title: '时间',
                dataIndex: 'create_time',
            }
        ]

        return (
            <TableComponent
                columns={columns}
                size="small"
                url={this.props.url}
            />
        )
    }
}

export default Log