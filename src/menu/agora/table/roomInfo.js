import React, { Component } from 'react';
import { Row, Col } from 'antd';

class RoomInfo extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const data = this.props.data ? this.props.data : {}

        return (
            <div>
                <Row>
                    <Col span={8}>
                        <div className="project-info">
                            <span>楼盘名称:</span>
                            <span>{data.building_name}</span>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="project-info">
                            <span>楼盘地址:</span>
                            <span>{data.building_adress}</span>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="project-info">
                            <span>楼盘均价:</span>
                            <span>{data.building_price}</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <div className="project-info">
                            <span>房产信息:</span>
                            <span>{data.room_number}</span>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default RoomInfo