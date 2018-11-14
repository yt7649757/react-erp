import React, {Component} from 'react';
import {Layout, Menu, Icon, Breadcrumb} from 'antd';
import HeaderComponent from '../common/header';
import Aside from '../common/aside'
import storage from '../utils/storage.js';
import axios from 'axios';
import { port } from '../common/port';
import cookie from 'react-cookies'

// import { Link } from 'react-router-dom';
// import '../style/app.css'

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;



class Template extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rootSubmenuKeys: '',
            sidebarData: []
        }
    }


    componentDidMount() {
        // const token = storage.get('access_token')
        const token = cookie.load('access_token')
        var _this = this
        axios.get(port + 'api/erp/index/getmenujson?token='+ token )
            .then(function (res) {
                console.log(res.data)
                var rootSubmenuKeys = res.data.map(item => item.menu_id)
                console.log(rootSubmenuKeys);
                _this.setState({
                    sidebarData: res.data,
                    rootSubmenuKeys: rootSubmenuKeys
                })
            }).catch(error => {
                alert('error' + '请求失败!')
        })
    }



    render() {
        return (
            <Layout>
                <HeaderComponent/>
                <Layout style={{paddingTop: '64px'}}>
                    <Aside sidebarData={this.state.sidebarData} rootSubmenuKeys={this.state.rootSubmenuKeys} />
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        {/*动态变化的部分,利用了react的props.children的特性*/}
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 780 }}>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        )
    }
}


export default Template