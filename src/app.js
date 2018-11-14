import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './style/app.css'
import TableComponent from './component/tableComponent';
import HeaderComponent from './common/header'
import storage from './utils/storage.js';
import { port } from './common/port'
// import $ from 'jquery';
// import 'whatwg-fetch';
import axios from 'axios';
// import WrappedNormalLoginForm  from './login/login'

const { SubMenu } = Menu;
const { Content, Sider, Footer } = Layout;

// 这里是最开始参考react-router所写的侧边栏路由，现在不用了
// 参考链接 https://www.cnblogs.com/SamWeb/p/8932931.html

const routes = [
    {
        path: "/",
        exact: true,
        sidebar: () => <div>home!</div>,
        main: () => <h2>Home</h2>
    },
    {
        path: "/bubblegum",
        sidebar: () => <TableComponent/>,
        main: () => <h2>Bubblegum</h2>
    },
    {
        path: "/shoelaces",
        sidebar: () => <div>shoelaces!</div>,
        main: () => <h2>Shoelaces</h2>
    }
];

class App extends Component {

    // constructor(props) {
    //     super(props)
    // }

    componentDidMount = () => {
        console.log(storage.get('access_token'))
        var access_token = storage.get('access_token')
        axios.get( port + 'api/erp/index/getmenujson?token=' + access_token)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return(
            <Router>
                <Layout>
                    <HeaderComponent/>
                    <Layout style={{paddingTop: '64px'}}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                                    <Menu.Item key="1">
                                        <Link to="/">Home</Link>
                                    </Menu.Item>
                                    <Menu.Item key="2">
                                        <Link to="/bubblegum">Bubblegum</Link>
                                    </Menu.Item>
                                    <Menu.Item key="3">
                                        <Link to="/shoelaces">Shoelaces</Link>
                                    </Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <SubMenu key="sub3" title="Submenu">
                                        <Menu.Item key="11">Option 11</Menu.Item>
                                        <Menu.Item key="12">Option 12</Menu.Item>
                                    </SubMenu>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            {/*内容区域*/}
                            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                                {routes.map((route, index) => (
                                    // You can render a <Route> in as many places
                                    // as you want in your app. It will render along
                                    // with any other <Route>s that also match the URL.
                                    // So, a sidebar or breadcrumbs or anything else
                                    // that requires you to render multiple things
                                    // in multiple places at the same URL is nothing
                                    // more than multiple <Route>s.
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.sidebar}
                                    />
                                ))}

                                {routes.map((route, index) => (
                                    // Render more <Route>s with the same paths as
                                    // above, but different components this time.
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.main}
                                    />
                                ))}

                            </Content>
                        </Layout>
                    </Layout>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Router>
        )
    }
}

export default  App