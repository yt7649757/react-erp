import React, {Component} from 'react';
import {Layout, Menu, Icon, Breadcrumb, Tabs} from 'antd';
import HeaderComponent from '../common/header';
import Aside from '../common/aside'
// import storage from '../utils/storage.js';
// import axios from 'axios';
// import {port} from '../common/port';
// import cookie from 'react-cookies'
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../redux/action/user';
import emitter from "./ev"
// import { Link } from 'react-router-dom';
// import '../style/app.css'

const {SubMenu} = Menu;
const {Content, Sider, Footer} = Layout;
const TabPane = Tabs.TabPane;
var panes = [];
var current = '';
class Template extends Component {

    constructor(props) {
        super(props)
        panes = JSON.parse(sessionStorage.getItem('routes'))
        current = sessionStorage.getItem('current')
        this.state = {
            title: '加载中...',
            ml: true,
            tabs: [],
            activeKey: current && current,
        }
    }

    componentWillReceiveProps(nextProps) {
        // current = sessionStorage.getItem('current')
        panes = JSON.parse(sessionStorage.getItem('routes'))
        // console.log('------------------------')
        // console.log(current)
        // console.log(nextProps.location.pathname.substring(1))
        this.setState({
            activeKey: nextProps.location.pathname.substring(1)
        })
    }

    componentWillUpdate(nextProps) {
    }

    componentDidMount() {
        this.eventEmitter = emitter.addListener("close",()=>{
            this.setState({
                ml: !this.state.ml
            })
        })
    }

    componentWillUnMount() {
        emitter.removeListener(this.eventEmitter);
    }

    //箭头函数的this总是和父级的上下文绑定在一起的
    // getTitle = (val) => {
    //    this.setState({
    //        title: val
    //    })
    // }

    onChange = (activeKey) => {
        this.setState({ activeKey });
        this.props.history.push('/' + activeKey)
    }


    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.url === targetKey) {
                lastIndex = i - 1;
            }
        });
        const tabArr =  panes.filter(pane => pane.url !== targetKey && pane.url !== '/erp');
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].url;
        }
        this.props.history.push('/' + activeKey)
        sessionStorage.setItem('routes',JSON.stringify(tabArr))
        this.setState({
            activeKey: activeKey
        })
    }



    render() {
        const { ml } = this.state
        return (
            <Layout style={{ height:'100vh',marginLeft: (ml ? 252 : 0) + 'px'}}>
                <HeaderComponent/>
                <Layout style={{paddingTop: '60px'}}>
                    <Aside sidebarData={this.props.user.sidebarData} rootSubmenuKeys={this.props.user.rootSubmenuKeys}
                     getTitle={this.getTitle}
                    />
                    <Layout style={{padding: '30px', paddingBottom: 0, height: '100%'}}>

                        <Tabs type="editable-card" hideAdd  onChange={this.onChange}  activeKey={this.state.activeKey} onEdit={this.onEdit}>
                            {
                                panes && panes.map(item => {
                                   return (
                                       <TabPane tab={item.menu_name} key={item.url} closable={item.closable}>
                                           {/*<div className="sub-nav">*/}
                                               {/*<span>当前位置 > </span><span>{this.props.location.state ? this.props.location.state.menu_name : this.state.title }</span>*/}
                                           {/*</div>*/}
                                           {/*动态变化的部分,利用了react的props.children的特性*/}
                                           <Content>
                                               {this.props.children}
                                           </Content>
                                       </TabPane>
                                   )
                                })
                            }

                        </Tabs>

                        <Footer style={{textAlign: 'center',padding:30, fontSize: '16px'}}>
                            当前版本<span style={{color: '#1890FF'}}>V2.0.0</span>©7搜网络版权所有
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