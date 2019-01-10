import React, { Component } from 'react';
// import Template from '../../common/template';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Divider,Row, Col, Button, Tabs } from 'antd';
import * as FinanceActions from '../../redux/action/finance/finance';
import Layer from '../../component/layer';
import CollectForm from './payReceive/collectForm';
import CollectApply from './payReceive/collectApply';
import PayMentApply from './payReceive/paymentApply';
import RefundApply from './payReceive/refundApply';
import ActualCollect from './payReceive/actualCollect';
import ActualPayment from './payReceive/actualPayment';
import ActualRefund from './payReceive/actualRefund';

const TabPane = Tabs.TabPane;

class PayReceive extends Component {

    doApply = () => {
        this.refs.layer.getWrappedInstance().showModal()
    }


    render() {
        return(
            <div>
                <div style={{backgroundColor: '#fff'}}>
                    <Divider>收款</Divider>
                    <Row type="flex">
                        <Col span={8}>
                            <div className="project-info">
                                <span>合同编号:</span>
                                <span>123</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="project-info">
                                <span>项目名称:</span>
                                <span>123</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="project-info">
                                <span>合同金额:</span>
                                <span>123</span>
                            </div>
                        </Col>
                    </Row>
                    <Row type="flex">
                        <Col span={8}>
                            <div className="project-info">
                                <span>已付定金:</span>
                                <span>123</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="project-info">
                                <span>实际收入:</span>
                                <span>123</span>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className="project-info">
                                <span>未收金额:</span>
                                <span>123</span>
                            </div>
                        </Col>
                    </Row>
                    <Row type="flex">
                        <Col span={8}>
                            <div className="project-info">
                                <span>实际支出:</span>
                                <span>123</span>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div style={{margin: '20px 0'}}>
                    <Button style={{marginRight: '10px'}} onClick={this.doApply}>新增收款</Button>
                    <Button style={{marginRight: '10px'}}>刷新</Button>
                    <Button>新增付款</Button>
                </div>

                <Layer ref="layer" width={700} title="新增收款">
                    <CollectForm/>
                </Layer>

                <Tabs defaultActiveKey="1">
                    <TabPane tab="收款申请" key="1">
                        <CollectApply/>
                    </TabPane>
                    <TabPane tab="付款申请" key="2">
                        <PayMentApply/>
                    </TabPane>
                    <TabPane tab="退款申请" key="3">
                        <RefundApply/>
                    </TabPane>
                    <TabPane tab="实际收款" key="4">
                        <ActualCollect/>
                    </TabPane>
                    <TabPane tab="实际付款" key="5">
                        <ActualPayment/>
                    </TabPane>
                    <TabPane tab="实际退款" key="6">
                        <ActualRefund/>
                    </TabPane>
                </Tabs>

            </div>
        )
    }
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


export default connect(mapStateToProps, mapDispatchToProps)(PayReceive)