import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
// import { sidebarData, groupKey } from '../test/data'
import {withRouter} from 'react-router-dom';
// import storage from '../utils/storage.js';
// import axios from 'axios';
// import { port } from '../common/port';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as userActions from '../redux/action/user';
import '../style/aside.css'

const {SubMenu, Item} = Menu;
const {Sider} = Layout;

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

class Aside extends Component {

    constructor(props) {
        super(props)
        // 初始化置空可以在遍历不到的时候应用默认值
        this.state = {
            openKeys: [''],
            selectedKeys: [''],
            rootSubmenuKeys: props.rootSubmenuKeys,
            itemName: '',
            sidebarData: []
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

    //等待修改，目前是三级目录
    /**
     *  selectedKeys   // 当前展开的 SubMenu 菜单项 key 数组
     *  openKeys       // 当前选中的菜单项 key 数组
     */
    setDefaultActiveItem = ({location}) => {
        const {pathname} = location;
        this.state.sidebarData && this.state.sidebarData.map(item => {
            //从一级目录开始查找
            if (pathname === ('/' +  item.url)) {
                console.log(item.menu_id)
                this.setState({
                    selectedKeys: [item.menu_id]
                });
                document.title = item.menu_name
                this.props.getTitle(item.menu_name)
            //一级目录没有找到，判断一级目录中是否存在二级菜单
            }else if(item.menus && item.menus.length > 0) {
                // 在二级目录中开始查找
                 item.menus.map(childItem => {
                     if(pathname === ('/' + childItem.url)) {
                         this.setState({
                             openKeys: [item.menu_id],
                             selectedKeys: [childItem.menu_id]
                         });
                         document.title = childItem.menu_name
                         this.props.getTitle(childItem.menu_name)
                     //二级目录也没有，就查询三级目录
                     }else if(childItem.menus && childItem.menus.length>0) {
                          childItem.menus.map(subItem => {
                              if(pathname === ('/' + subItem.url)) {
                                  this.setState({
                                      openKeys: [item.menu_id,childItem.menu_id],   //当前是三级菜单，所以需要同时展开二级和一级目录
                                      selectedKeys: [subItem.menu_id]
                                  });
                                  document.title = subItem.menu_name
                                  this.props.getTitle(subItem.menu_name)
                              }
                          })
                     }
                 })
            }
        });
    };

    componentDidMount = async () => {
        await this.props.userActions.getSider()
    };

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
        const {collapsed, onCollapse} = this.props;
        const SideTree = sidebarData.map(item => (
            !item.menus ? (
                <Menu.Item key={item.menu_id}
                           onClick={() => {
                               // 设置高亮的item
                               this.setState({selectedKeys: [item.menu_id]});
                               // 设置文档标题
                               document.title = item.menu_name;
                           }}
                 >
                    <img src={item.icon} alt="icon"/>
                    <span>{item.menu_name}</span>
                    {/*出现url追加问题，在Link路径前加 '/' 代表根目录下的绝对路径 */}
                    <Link to={{pathname: '/' + item.url, state: item.menu_name}} replace></Link>
                </Menu.Item>
            ) : (
                <SubMenu
                    key={item.menu_id}
                    title={
                        <span>
                            <img src={item.icon} alt="icon"/>
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
                                                       // 设置高亮的item
                                                       this.setState({selectedKeys: [subItem.menu_id]});
                                                       // 设置文档标题
                                                       document.title = subItem.menu_name;
                                                   }}
                                        >
                                            <Link to={{pathname: '/' + subItem.url, state: subItem.menu_name}}> {subItem.menu_name} </Link>
                                        </Menu.Item>
                                    ))
                                }
                            </SubMenu>
                        ) : (

                            <Menu.Item
                                key={menuItem.menu_id}
                                onClick={() => {
                                    // 设置高亮的item
                                    this.setState({selectedKeys: [menuItem.menu_id]});
                                    // 设置文档标题
                                    document.title = menuItem.menu_name;
                                }}>
                                <Link to = {{pathname: '/' + menuItem.url, state: menuItem.menu_name}}> {menuItem.menu_name} </Link>
                            </Menu.Item> )
                    ))}
                </SubMenu>
            )
        ));

        return (
            <Sider
                collapsible
                breakpoint="lg"
                collapsed={collapsed}
                onCollapse={onCollapse}
                trigger={null}
            >
                <Menu
                    subMenuOpenDelay={0.3}
                    theme="dark"
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    mode="inline"
                    onOpenChange={this.OpenChange}>
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