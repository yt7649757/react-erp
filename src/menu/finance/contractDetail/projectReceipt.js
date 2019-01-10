import React, {Component} from 'react';
import { Divider, Row, Col,Tabs } from 'antd';
// import Template from '../../../common/template';
import PayTable from './payTable';
const TabPane = Tabs.TabPane;

class ProjectReceipt extends Component {
    render() {

        const columns = [{
            title: '资金说明',
            dataIndex: 'desc'
        },{
            title: '收入金额',
            dataIndex: 'income_price'
        },{
            title: '交易时间',
            dataIndex: 'create_time'
        },{
            title: '审核人',
            dataIndex: 'name'
        }]

        return (
            <div>
                <div style={{'backgroundColor': '#fff', paddingTop: 10}}>
                    <Divider>项目详情</Divider>
                    <div style={{padding: 20}}>
                        <Row style={{marginBottom: 20}}>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>合同编号:</span>
                                    <span>123</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>项目名称:</span>
                                    <span>深圳</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>合同金额:</span>
                                    <span>123</span>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginBottom: 20}}>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>总收入:</span>
                                    <span>123</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>总支出:</span>
                                    <span>123</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>亏损:</span>
                                    <span>123</span>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Tabs defaultActiveKey="1">
                        <TabPane tab="其中款项" key="1">暂无数据</TabPane>

                        <TabPane tab="收入明细" key="2">
                            <PayTable
                                columns={columns}
                            />
                        </TabPane>

                        <TabPane tab="支持明细" key="3">
                            <PayTable
                                columns={columns}
                            />
                        </TabPane>
                    </Tabs>


                </div>
            </div>
        )
    }
}

export default ProjectReceipt