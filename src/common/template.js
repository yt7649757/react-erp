import React, {Component} from 'react';
import {Layout, Menu, Icon, Breadcrumb} from 'antd';
import HeaderComponent from '../common/header';
import Aside from '../common/aside'
import storage from '../utils/storage.js';
import axios from 'axios';
import {port} from '../common/port';
import cookie from 'react-cookies'
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../redux/action/user';

// import { Link } from 'react-router-dom';
// import '../style/app.css'

const {SubMenu} = Menu;
const {Content, Sider, Footer} = Layout;


class Template extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rootSubmenuKeys: '',
            sidebarData: []
        }
    }


    componentDidMount() {
        this.props.userActions.getSider()
    }


    render() {
        return (
            <Layout style={{ height:'100%' }}>
                <HeaderComponent/>
                <Layout style={{paddingTop: '60px', height: '100%'}}>
                    <Aside sidebarData={this.props.user.sidebarData} rootSubmenuKeys={this.props.user.rootSubmenuKeys}/>
                    <Layout style={{padding: '30px'}}>
                        <div className="sub-nav">
                            <span>当前位置 > </span><span>{this.props.location.data ? this.props.location.data.name : '首页'}</span>
                        </div>
                        {/*动态变化的部分,利用了react的props.children的特性*/}
                        <Content style={{background: '#fff', padding: 30, margin: 0}}>
                            {this.props.children}
                        </Content>
                        <Footer style={{textAlign: 'center',padding:0}}>
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
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


//高阶组件
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Template))