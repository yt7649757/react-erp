import React, {Component} from 'react';
import {Layout, Tabs} from 'antd';
import HeaderComponent from '../common/header';
import Aside from '../common/aside'
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import storage from '../utils/storage';
import * as userActions from '../redux/action/user';
import emitter from "./ev";
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import PotentialError from '../component/potentialError';
// import { renderRoutes } from 'react-router-config'

const {Content, Footer} = Layout;
const TabPane = Tabs.TabPane;
let panes = [];
let current = '';

class Template extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '加载中...',
            ml: true,
            activeKey: current,
        }
    }

    componentWillReceiveProps(nextProps) {
        panes = JSON.parse(sessionStorage.getItem('routes'))
        current = sessionStorage.getItem('current')
        if(this.props.location.pathname !== nextProps.location.pathname ) {
            this.setState({
                activeKey: nextProps.location.pathname.substring(1)
            })
        }
    }


    expand = () => {
        this.setState({
            ml: !this.state.ml
        })
    }


    componentDidMount() {
        emitter.addListener("close", () => {
            this.expand()
        })
        this.setState({
            activeKey: this.props.location.pathname.substring(1)
        })
    }

    componentWillUnmount() {
        emitter.removeListener("close", this.expand);
    }

    onChange = (activeKey) => {
        this.setState({activeKey});
        this.props.history.push('/' + activeKey)
        emitter.emit('changeSelect')
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
        const tabArr = panes.filter(pane => pane.url !== targetKey && pane.url !== '/erp');
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].url;
        }
        // this.props.history.push('/' + activeKey)
        this.onChange(activeKey)
        storage.set('routes', tabArr)
        this.setState({
            activeKey: activeKey
        })
    }


    render() {
        const {ml} = this.state
        return (
            <PotentialError>
                <LocaleProvider locale={zh_CN}>
                    <Layout style={{marginLeft: (ml ? 252 : 0) + 'px'}}>
                        <Aside sidebarData={this.props.user.sidebarData}
                               rootSubmenuKeys={this.props.user.rootSubmenuKeys}
                               getTitle={this.getTitle}
                        />

                        <HeaderComponent/>
                        <Layout style={{
                            paddingTop: '60px',
                            position: 'relative',
                            minHeight: '100vh',
                            backgroundColor: '#fff',
                            width: '100%'
                        }}>


                            <div style={{padding: '25px'}}>


                                <Tabs type="editable-card" hideAdd onChange={this.onChange}
                                      activeKey={this.state.activeKey} animated={false}
                                      onEdit={this.onEdit}>
                                    {
                                        panes && panes.map(item => {
                                            return (
                                                <TabPane tab={item.menu_name} key={item.url} closable={item.closable}>
                                                    <Content style={{padding: '0 5px', paddingBottom: '60px'}}>
                                                        {this.props.children}
                                                    </Content>
                                                </TabPane>
                                            )
                                        })
                                    }

                                </Tabs>


                            </div>

                            <Footer style={{
                                textAlign: 'center',
                                position: 'absolute',
                                width: '100%',
                                bottom: 0,
                                backgroundColor: '#FAFAFA',
                                padding: '10px 50px'
                            }}>
                                当前版本<span style={{color: '#1890FF'}}>V2.0.0</span>©7搜网络版权所有
                            </Footer>


                        </Layout>

                    </Layout>
                </LocaleProvider>
            </PotentialError>
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