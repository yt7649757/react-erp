import React, { Component } from 'react';
import Template from '../../common/template';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Divider,Row, Col } from 'antd';
import * as FinanceActions from '../../redux/action/finance/finance';

class PayReceive extends Component {
    render() {
        return(
            <Template>
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
            </Template>
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