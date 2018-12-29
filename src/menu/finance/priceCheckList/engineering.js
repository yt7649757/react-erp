import React, { Component } from 'react';
import Template from '../../../common/template';
import TableComponent from '../../../component/tableComponent';
import Layer from '../../../component/layer';
import { getId } from "../../../utils/getId";
import CreateTab from '../../../utils/createTab';
import { Divider, Button} from 'antd';

class Engineering extends Component {

    add = () => {
        this.refs.layer.getWrappedInstance().showModal()
    }

    look = (params) => {
        const pro_id = getId(this.props.history.location.pathname)
        const url = `erp/finance/lookbuilddetailed/pro_id/${pro_id}/id/${params.guid}`;
        new CreateTab(url,{
            guid: `gcmx`,
            menu_name: '工程明细',
            url: url
        }).create()
        this.props.history.push('/' + url)
    }


    lookContact = () => {
        //http://www.yzferp.com/erp/finance/contractprintlook/pro_id/PA5C0C75E793A76555751
        const pro_id = getId(this.props.history.location.pathname)
        const url = `erp/finance/contractprintlook/pro_id/${pro_id}`;
        new CreateTab(url,{
            guid: `gcmx`,
            menu_name: '发包预算浏览',
            url: url
        }).create()
        this.props.history.push('/' + url)
    }


    render() {
        const columns = [{
            title: '工程类别',
            dataIndex: 'categories_name'
        },{
            title: '工程价格',
            dataIndex: 'categories_price'
        },{
            title: '施工开始日期',
            dataIndex: 'build_time'
        }, {
            title: '施工结束日期',
            dataIndex: 'build_end_time'
        }, {
            title: '工程提醒',
            dataIndex:'build_status'
        }, {
            title: '施工天数',
            dataIndex: 'build_days'
        }, {
            title: '发包经理',
            dataIndex: 'build_user',
            render: (text) => {
                return (
                    <a href="javascript:;" onClick={this.add}>查看</a>
                )
            }
        }, {
            title: '操作',
            render: (text) => {
                return (
                    <a href="javascript:;" onClick={() => this.look(text)}>查看明细</a>
                )
            }
        }]

        const columns1 = [{
            title: '工程类别',
            dataIndex: 'category_name'
        }, {
            title: '领款百分比',
            dataIndex: 'value'
        }, {
            title: '领款金额',
            dataIndex: 'price'
        }]


        const columns11 = [{
            title: '部门',
            dataIndex: ''
        },{
            title: '姓名',
            dataIndex:''
        },{
            title: '职务',
            dataIndex: ''
        },{
            title: '联系电话',
            dataIndex: ''
        },{
            title: '操作'
        }]

        return (
            <Template>
                <Divider orientation="left">项目工程</Divider>
                <div style={{marginBottom: '20px'}}>
                    <Button>合同预算浏览</Button>
                    <Button style={{marginLeft: '10px'}} onClick={this.lookContact}>发包预算浏览</Button>
                </div>
                <TableComponent
                    columns={columns}
                    size="middle"
                    testUrl="https://www.easy-mock.com/mock/5c185df39172fa10e61b63b3/erp/erp/finance/lookbuildfinance/1"
                />
                <Divider orientation="left">领款明细</Divider>
                <TableComponent
                    columns={columns1}
                    size="middle"
                    testUrl="https://www.easy-mock.com/mock/5c185df39172fa10e61b63b3/erp/erp/finance/lookbuildfinance/2"
                />
                <Layer ref="layer" title="施工队" width={700} footer={null}>
                    <TableComponent
                        columns={columns11}
                        size="middle"
                    />
                </Layer>
            </Template>
        )
    }
}

export default Engineering