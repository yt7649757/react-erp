import React, { Component } from 'react';
import { Row, Col } from 'antd';

class RoomInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <span>楼盘名称</span>
                        <span>--</span>
                    </Col>
                    <Col span={8}>
                        <span>楼盘地址</span>
                        <span>--</span>
                    </Col>
                    <Col span={8}>
                        <span>楼盘均价</span>
                        <span>--</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <span>房产信息</span>
                        <span>--</span>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default RoomInfo