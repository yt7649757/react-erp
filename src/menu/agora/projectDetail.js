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
// import TrackingLog from './table/trackingLog';
// import RemindInfo from './table/remindInfo';
// import ProjectImg from './table/projectImg';
// import ProjectPaper from './table/projectPaper';

import TableComponent from '../../component/tableComponent';


const TabPane = Tabs.TabPane;


const content = function (item) {
    return item.content ? item : null
}

class ProjectDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: '',
            settings: ['decoration_grade', 'decoration_style', 'decoration_type', 'color_orientation', 'customer_source', 'householder_relation'],
        }
    }

    componentDidMount() {
        //从本地存储中获取项目信息
        const arr = storage.get('routes')
        const data = arr.find(content)

        this.setState({
            data
        })

        //接口获取
        const url = `/api/erp/project/showprojectofuser/guid/${data.content.guid}`
        this.props.agoraActions.getProjectInfo(url)

        this.state.settings.map(item => {
            this.props.agoraActions.getSelects(item)
        })

    }

    render() {
        // const info = this.state.data ? this.state.data.content : {};

        const info = this.props.agora.projectInfo ? this.props.agora.projectInfo : {}
        const selectGroup = this.props.agora.selectGroup ? this.props.agora.selectGroup : {}

        const url = {
            trackingLog: `/api/erp/project/showlog/project_guid/${info.guid}`,
            remindInfo: `/api/erp/project/showremindtime/project_guid/${info.guid}`,
            projectImg: `/api/erp/project/showphotolist/project_guid/${info.guid}`,
            projectPaper: `/api/erp/project/showfieldlist/project_guid/${info.guid}`
        }


        const columns = [{
            title: '图片名称',
            dataIndex: 'photo_name',
            key: 'photo_name',
        }, {
            title: '上传者',
            dataIndex: 'uuid_name',
            key: 'uuid_name',
        }, {
            title: '图片描述',
            dataIndex: 'photo_desc',
            key: 'photo_desc',
        }, {
            title: '操作',
            render: () => {
                return (
                    <span>
                  <a href="javascript:void (0);">预览</a>
                  <Divider type="vertical"/>
                  <a href="javascript:;">下载</a>
                  <Divider type="verticla"/>
                  <a href="javascript:;">删除</a>
                 </span>
                )
            }
        }];

        const columns1 = [{
            title: '文件名称',
            dataIndex: 'field_name',
            key: 'field_name',
        }, {
            title: '上传者',
            dataIndex: 'uuid_name',
            key: 'uuid_name',
        }, {
            title: '文件描述',
            dataIndex: 'field_desc',
            key: 'field_desc',
        }, {
            title: '操作',
            render: () => {
                return (
                    <span>
                  <a href="javascript:;">下载</a>
                  <Divider type="verticla"/>
                  <a href="javascript:;">删除</a>
                 </span>
                )
            }
        }];

        const columns2 = [
            {
                title: '姓名',
                dataIndex: 'user.username',
            }, {
                title: '部门',
                dataIndex: 'department.department_name',
            }, {
                title: '职位',
                dataIndex: 'jobs.jobs_name',
            }, {
                title: '跟踪内容',
                dataIndex: 'log_content',
                width: '30%',
            }, {
                title: '时间',
                dataIndex: 'create_time',
            }
        ]

        const columns3 = [{
            title: '提醒时间',
            dataIndex: 'remind_time',
            key: 'remind_time',
        }, {
            title: '提醒内容',
            dataIndex: 'remind_content',
            key: 'remind_content',
        }, {
            title: '添加者',
            dataIndex: 'name',
            key: 'name',
        }]

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
                                <LinkPeople data={info.contacts} selectGroup={selectGroup}/>
                            </TabPane>
                            <TabPane tab="房屋结构" key="2">
                                <RoomStructure data={info.structure}/>
                            </TabPane>
                            <TabPane tab="楼盘信息" key="3">
                                <RoomInfo data={info.building}/>
                            </TabPane>
                            <TabPane tab="跟踪日志" key="4">
                                <TableComponent url={url.trackingLog} columns={columns2}/>
                            </TabPane>
                            <TabPane tab="提醒信息" key="5">
                                <TableComponent url={url.remindInfo} columns={columns3}/>
                            </TabPane>
                            <TabPane tab="项目图片" key="6">
                                <TableComponent url={url.projectImg} columns={columns}/>
                            </TabPane>
                            <TabPane tab="项目文件" key="7">
                                <TableComponent url={url.projectPaper} columns={columns1}/>
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