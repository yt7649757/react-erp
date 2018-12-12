import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../../redux/action/agora/agora';
import {Divider, Row, Col, Button, Tabs} from 'antd';
import Template from '../../common/template';
import storage from '../../utils/storage';
import '../../style/agora/projectDetail.css';
import LinkPeople from './table/linkPeople';
import RoomStructure from './table/roomStructure';
import RoomInfo from './table/roomInfo';
import TrackingLog from './table/trackingLog';
import RemindInfo from './table/remindInfo';
import ProjectImg from './table/projectImg';
import ProjectPaper from './table/projectPaper';

const TabPane = Tabs.TabPane;


const content = function (item) {
    return item.content ? item : null
}

class ProjectDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: '',
            settings: ['decoration_grade', 'decoration_style', 'decoration_type', 'color_orientation', 'customer_source'],
        }
    }

    componentDidMount() {
        const arr = storage.get('routes')
        const data = arr.find(content)

        this.setState({
            data
        })

        this.state.settings.map(item => {
            this.props.agoraActions.getSelects(item)
        })

    }

    render() {
        const info = this.state.data ? this.state.data.content : {};
        const selectGroup = this.props.agora.selectGroup ? this.props.agora.selectGroup : {}
        console.log(selectGroup);

        return (
            <Template>
                <div style={{'backgroundColor': '#fff', paddingTop: 10}}>
                    <Divider>项目详情</Divider>
                    <div style={{padding: 20}}>
                        <Row style={{marginBottom: 20}}>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>项目名称:</span>
                                    <span>{info.project_name}</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>客户来源:</span>
                                    <span>
                                    {selectGroup.customer_source ? selectGroup.customer_source[info.customer_source] : info.customer_source}
                                </span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>装修类型:</span>
                                    <span>
                                    {selectGroup.decoration_type ? selectGroup.decoration_type[info.decoration_type] : info.decoration_type}
                                </span>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginBottom: 20}}>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>装修档次:</span>
                                    <span>
                                    {selectGroup.decoration_grade ? selectGroup.decoration_grade[info.decoration_grade] : info.decoration_grade}
                                </span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>色彩取向:</span>
                                    <span>
                                    {selectGroup.color_orientation ? selectGroup.color_orientation[info.color_orientation] : info.color_orientation}
                                </span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>装修风格:</span>
                                    <span>
                                    {selectGroup.decoration_style ? selectGroup.decoration_style[info.decoration_style] : info.decoration_style}
                                </span>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginBottom: 20}}>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>工程预算:</span>
                                    <span>{info.project_budget}</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>预计总工期:</span>
                                    <span>{info.expected_duration}</span>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>工程地址:</span>
                                    <span>{info.project_address}</span>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <div className="project-info">
                                    <span>项目要求:</span>
                                    <span>{info.project_description}</span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div style={{marginBottom: 30}}>
                        <Button style={{marginLeft: 15}}>修改项目信息</Button>
                        <Button style={{marginLeft: 15}}>添加联系人</Button>
                        <Button style={{marginLeft: 15}}>更改房屋结构</Button>
                        <Button style={{marginLeft: 15}}>更改楼盘信息</Button>
                        <Button style={{marginLeft: 15}}>添加日志</Button>
                        <Button style={{marginLeft: 15}}>添加提醒</Button>
                    </div>
                    <Divider>项目其他</Divider>
                    <div style={{padding: 15}}>
                        <Tabs>
                            <TabPane tab="联系人" key="1">
                                <LinkPeople/>
                            </TabPane>
                            <TabPane tab="房屋结构" key="2">
                                <RoomStructure/>
                            </TabPane>
                            <TabPane tab="楼盘信息" key="3">
                                <RoomInfo/>
                            </TabPane>
                            <TabPane tab="跟踪日志" key="4">
                                <TrackingLog/>
                            </TabPane>
                            <TabPane tab="提醒信息" key="5">
                                <RemindInfo/>
                            </TabPane>
                            <TabPane tab="项目图片" key="6">
                                <ProjectImg/>
                            </TabPane>
                            <TabPane tab="项目文件" key="7">
                                <ProjectPaper/>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </Template>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        agora: state.agora,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        agoraActions: bindActionCreators(AgoraActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail)