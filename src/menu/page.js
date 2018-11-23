import React, {Component} from 'react';
import Template from '../common/template'
import '../style/page/index.css'
import Circle from '../component/circle'
import { Table, Badge  } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../redux/action/user';
import Title from '../component/title'
import ListItem from '../component/listItem'

const columns = [{
    title: '姓名',
    dataIndex: 'name',
}, {
    title: '部门',
    dataIndex: 'company.department.department_name',
}, {
    title: '职位',
    dataIndex: 'company.jobs.jobs_name',
}, {
    title: '电话',
    dataIndex: 'mobile'
}];


class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 3,
        };
    }

    componentDidMount() {
        this.props.userActions.onlineUser()
        this.props.userActions.getUserWork()
        this.props.userActions.getMessage()
    }

    handleChange = (value) => {
        this.setState({value});
    }


    render() {
        const {value} = this.state;
        return (
            <Template>
                <div className="sell-box clearfix">
                    <ul className="sell-list">
                        <li><a href="#"><img src={require('../asset/img/sell1.png')}/><div className="info"><p>Sales champion</p><p>销售月冠</p></div></a></li>
                        <li><a href="#"><img src={require('../asset/img/sell2.png')}/><div className="info"><p>Sales champion</p><p>销售月冠</p></div></a></li>
                        <li><a href="#"><img src={require('../asset/img/sell3.png')}/><div className="info"><p>Sales champion</p><p>销售月冠</p></div></a></li>
                        <li><a href="#"><img src={require('../asset/img/sell4.png')}/><div className="info"><p>Sales champion</p><p>销售月冠</p></div></a></li>
                    </ul>
                </div>
                <div className="center-box">
                    <div className="service-time">
                         <div className="sub-title">
                             <b></b>
                             <span>服务期限</span>
                         </div>
                         <p className="day">剩余天数</p>
                         <Circle/>
                         <div className="start-time">
                             <p>服务开始时间: <span>2018-11-21</span></p>
                             <p>服务结束时间: <span>2019-11-21</span></p>
                         </div>
                    </div>
                    <div className="online-people">
                         <div className="sub-title">
                             <b></b>
                             <span>在线人数</span>
                             <p><span>人数:</span><span>{this.props.user.onlineUser.length}</span></p>
                         </div>
                        <Table rowKey="uuid" columns={columns} dataSource={this.props.user.onlineUser} size="middle"  pagination={{
                            pageSize: 5
                        }} />
                    </div>
                </div>
                <div className="message-box">
                    <div className="today-remind">
                        <Title title="今日提醒" color="#FF7A00" />
                        <div className="remind-list">
                             <ul>
                                 <li><a href="#">预约</a><Badge count="1"/></li>
                                 <li><a href="#">业务跟踪</a><Badge count="99"/></li>
                                 <li><a href="#">验收提醒</a><Badge showZero={true} count="0" style={{backgroundColor: '#52c41a'}}></Badge></li>
                                 <li><a href="#">维修投诉</a><Badge count="99"/></li>
                                 <li><a href="#">今日提醒</a><Badge count="99"/></li>
                                 <li><a href="#">超期提醒</a><Badge count="99"/></li>
                                 <li><a href="#">收款提醒</a><Badge count="99"/></li>
                             </ul>
                        </div>
                    </div>
                    <div>
                        <Title title="公司公告" color="#1890FF" more={true} />
                        <ListItem data={this.props.user.companyMessage} />
                    </div>
                    <div>
                        <Title title="部门公告" color="#B5BE00" more={true} />
                    </div>
                    <div>
                        <Title title="奖惩公告" color="#E63F52" more={true} />
                    </div>
                </div>
            </Template>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Page);

