import React, { Component } from 'react';
import { Row, Col } from 'antd';

class RoomStructure extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <span>居室结构</span>
                        <span>--</span>
                    </Col>
                    <Col span={8}>
                        <span>房屋用途</span>
                        <span>--</span>
                    </Col>
                    <Col span={8}>
                        <span>房屋朝向</span>
                        <span>--</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <span>采光</span>
                        <span>--</span>
                    </Col>
                    <Col span={8}>
                        <span>房屋类型</span>
                        <span>--</span>
                    </Col>
                    <Col span={8}>
                        <span>楼层</span>
                        <span>--</span>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default RoomStructure