import React, { Component } from 'react';
import { Table } from 'antd';
import emitter from "../../../common/ev";


class LinkPeople extends Component {
    constructor(props) {
        super(props)
    }

    // componentDidMount() {
    //     this.eventEmitter = emitter.addListener("LinkPeopleForm", () => {
    //        this.request()
    //     })
    // }
    //
    // componentWillUnMount() {
    //     emitter.removeListener(this.eventEmitter);
    // }

    render() {

        const { selectGroup } = this.props;
        const data = this.props.data ? this.props.data : []

        const columns = [{
            title: '姓名',
            dataIndex: 'contact_name',
            key: 'contact_name',
        }, {
            title: '年龄',
            dataIndex: 'sex',
            key: 'sex',
        }, {
            title: '联系电话',
            dataIndex: 'contact_number',
            key: 'contact_number',
        },{
            title: 'QQ',
            dataIndex: 'customer_qq',
            key: 'customer_qq',
        },{
            title: 'Email',
            dataIndex: 'customer_email',
            key: 'customer_email',
        },{
            title: '与户主关系',
            dataIndex: 'householder_relation',
            key: 'householder_relation',
            render: (text,record) => {
                return selectGroup.householder_relation ? selectGroup.householder_relation[text] : null
            }
        }];



        return (
            <Table
                rowKey={record => record.guid}
                dataSource={data}
                columns={columns}
                size="small" />
        )
    }
}

export default LinkPeople