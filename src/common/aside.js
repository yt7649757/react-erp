import React, {Component} from 'react';
import {Layout, Menu } from 'antd';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import emitter from "./ev";
import storage from '../utils/storage';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../redux/action/user';
import '../style/aside.css'

const {SubMenu } = Menu;
const {Sider} = Layout;

let arr = []

class Aside extends Component {

    constructor(props) {
        super(props)
        this.state = {
            openKeys: [''],
            selectedKeys: [''],
            rootSubmenuKeys: props.rootSubmenuKeys,
            itemName: '',
            sidebarData: [],
            collapsed: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sidebarData.length > 0) {
            this.setState({
                sidebarData: nextProps.sidebarData
            }, () => {
                this.setDefaultActiveItem(this.props.history)
            })
        }
    }

    componentWillUnmount() {
        arr = []
        emitter.removeListener("close", this.expand);
        // this.setState = (state,callback)=>{
        //     return;
        // };
    }


    setRoutes = (obj) => {
        const routes = JSON.parse(sessionStorage.getItem('routes'))
        routes && (arr = routes)
        if (arr.length >= 1 && obj) {
            if (JSON.stringify(arr).indexOf(JSON.stringify(obj)) === -1) {
                arr.push(obj)
            }
        } else {
            arr.push(obj)
        }
        storage.set('routes', arr)
    }


    setDefaultActiveItem = ({location}) => {
        const {pathname} = location;
        this.state.sidebarData && this.state.sidebarData.map(item => {
            if (pathname === ('/' + item.url)) {
                this.setState({
                    selectedKeys: [item.menu_id]
                });
                document.title = item.menu_name
                // this.setRoutes(item)
            } else if (item.menus && item.menus.length > 0) {
                item.menus.map(childItem => {
                    if (pathname === ('/' + childItem.url)) {
                        this.setState({
                            openKeys: [item.menu_id],
                            selectedKeys: [childItem.menu_id]
                        });
                        document.title = childItem.menu_name
                        // this.setRoutes(childItem)
                    } else if (childItem.menus && childItem.menus.length > 0) {
                        childItem.menus.map(subItem => {
                            if (pathname === ('/' + subItem.url)) {
                                this.setState({
                                    openKeys: [item.menu_id, childItem.menu_id],
                                    selectedKeys: [subItem.menu_id]
                                });
                                document.title = subItem.menu_name
                                // this.setRoutes(subItem)
                            }
                        })
                    }
                })
            }
        });
    };


    expand = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    componentDidMount = () => {
        this.props.userActions.getSider()
        emitter.addListener("close", () => {
           this.expand()
        })
        emitter.addListener('changeSelect', () => {
            this.setDefaultActiveItem(this.props.history)
        })
    }


    OpenChange = openKeys => {
        const latestOpenKey = openKeys.find(
            key => this.state.openKeys.indexOf(key) === -1
        );
        if (this.props.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [...openKeys]
            });
        }
    };


    render() {
        const {openKeys, selectedKeys} = this.state;
        const {sidebarData} = this.props.user
        const SideTree = sidebarData.map(item => (
            !item.menus ? (
                <Menu.Item key={item.menu_id}
                           onClick={() => {
                               this.setState({selectedKeys: [item.menu_id]});
                               document.title = item.menu_name;
                               this.setRoutes(item)
                           }}
                >
                    <img src={item.icon ? item.icon : 'http://wechat.yzferp.com/static/erp/images/work_oa.png'} alt="icon"/>
                    <span>{item.menu_name}</span>
                    <Link to={{pathname: '/' + item.url, state: item}}>{item.menu_name}</Link>
                </Menu.Item>
            ) : (
                <SubMenu
                    key={item.menu_id}
                    title={
                        <span>
                            <img src={item.icon ? item.icon : 'http://wechat.yzferp.com/static/erp/images/work_oa.png'} alt="icon"/>
                        <span>{item.menu_name}</span>
                    </span>
                    }>
                    {item.menus &&
                    item.menus.map(menuItem => (
                        menuItem.menus ? (
                            <SubMenu key={menuItem.menu_id} title={menuItem.menu_name}>
                                {
                                    menuItem.menus.map(subItem => (
                                        <Menu.Item key={subItem.menu_id}
                                                   onClick={() => {
                                                       this.setState({selectedKeys: [subItem.menu_id]});
                                                       document.title = subItem.menu_name;
                                                       this.setRoutes(subItem)
                                                   }}
                                        >
                                            <Link to={{
                                                pathname: '/' + subItem.url,
                                                state: subItem
                                            }}> {subItem.menu_name} </Link>
                                        </Menu.Item>
                                    ))
                                }
                            </SubMenu>
                        ) : (

                            <Menu.Item
                                key={menuItem.menu_id}
                                onClick={() => {
                                    this.setState({selectedKeys: [menuItem.menu_id]});
                                    document.title = menuItem.menu_name;
                                    this.setRoutes(menuItem)
                                }}>
                                <Link to={{pathname: '/' + menuItem.url, state: menuItem}}> {menuItem.menu_name} </Link>
                            </Menu.Item> )
                    ))}
                </SubMenu>
            )
        ));

        return (
            <Sider
                collapsible
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {

                }}
                onCollapse={(collapsed, type) => {

                }}
                collapsed={this.state.collapsed}
                trigger={null}
                width="252"
                className="scrollbar"
                style={{
                    overflow: 'auto', height: '100vh', paddingBottom: '10vh', position: 'fixed', left: 0, zIndex: 999, top: '60px',
                    backgroundColor: "#1F2B35"
                }}
            >
                <Menu
                    subMenuOpenDelay={0.3}
                    inlineCollapsed={true}
                    theme="dark"
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    mode="inline"
                    onOpenChange={this.OpenChange}
                    style={{
                        backgroundColor: "#1F2B35",
                    }}
                >
                    {SideTree}
                </Menu>
            </Sider>

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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Aside))