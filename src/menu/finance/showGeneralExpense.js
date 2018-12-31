import React, { Component } from 'react';
import Template from '../../common/template';
import { Divider, Tabs } from 'antd';
import CollectApply from './payReceive/collectApply';
import PayMentApply from './payReceive/paymentApply';
import RefundApply from './payReceive/refundApply';
import ActualCollect from './payReceive/actualCollect';
import ActualPayment from './payReceive/actualPayment';
import ActualRefund from './payReceive/actualRefund';
const TabPane = Tabs.TabPane;

class ShowGeneralExpense extends Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        return(
            <Template>
                <Divider orientation="left">收款</Divider>
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
            </Template>
        )
    }
}

export default ShowGeneralExpense