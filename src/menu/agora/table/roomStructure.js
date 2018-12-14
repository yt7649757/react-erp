import React, { Component } from 'react';
import { Row, Col } from 'antd';

class RoomStructure extends Component {
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
                            <span>居室结构:</span>
                            <span>{data.living_room_structure}</span>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="project-info">
                            <span>房屋用途:</span>
                            <span>{data.housing_use}</span>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="project-info">
                            <span>房屋朝向:</span>
                            <span>{data.house_orientation}</span>
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: '10px'}}>
                    <Col span={8}>
                        <div className="project-info">
                            <span>采光:</span>
                            <span>{data.lighting}</span>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="project-info">
                            <span>房屋类型:</span>
                            <span>{data.house_type}</span>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div className="project-info">
                            <span>楼层:</span>
                            <span>{data.floor}</span>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default RoomStructure