import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
// import { sidebarData, groupKey } from '../test/data'
import {withRouter} from 'react-router-dom';
// import storage from '../utils/storage.js';
// import axios from 'axios';
// import { port } from '../common/port';
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
            rootSubmenuKeys: '',
            itemName: '',
            sidebarData: []
        }
    }


    // setDefaultActiveItem = ({location}) => {
    //     const { pathname } = location;
    //      this.state.sidebarData.map(item => {
    //         if (item.pathname) {
    //             // 做一些事情,这里只有二级菜单
    //         }
    //         // 因为菜单只有二级,简单的做个遍历就可以了
    //         if (item.menus && item.menus.length > 0) {
    //             item.menus.map(childitem => {
    //                 // 为什么要用match是因为 url有可能带参数等,全等就不可以了
    //                 // 若是match不到会返回null
    //                 if (pathname.match(childitem.path)) {
    //                     this.setState({
    //                         openKeys: [item.menu_id],
    //                         selectedKeys: [childitem.menu_id]
    //                     });
    //                     // 设置title
    //                     document.title = childitem.menu_name;
    //                 }
    //             });
    //         }
    //     });
    // };
    //
    // componentDidMount = () => {
    //     // 设置菜单的默认值
    //     this.setDefaultActiveItem(this.props.history);
    // };

    OpenChange = openKeys => {
        console.log(openKeys);
        const latestOpenKey = openKeys.find(
            key => this.state.openKeys.indexOf(key) === -1
        );
        console.log(latestOpenKey);
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [...openKeys]
            });
        }
    };


    render() {

        const {openKeys, selectedKeys} = this.state;
        const {sidebarData} = this.props
        const {collapsed, onCollapse} = this.props;
        const SideTree = sidebarData.map(item => (
            <SubMenu
                key={item.menu_id}
                title={
                    <span>
                        <Icon type={item.icon}/>
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
                                            <Link to={subItem.url}>{subItem.menu_name}</Link>
                                        </Menu.Item>
                                    ) )
                                }
                            </SubMenu>
                        ) : (

                        <Item
                            key={menuItem.menu_id}
                            onClick={() => {
                                // 设置高亮的item
                                this.setState({selectedKeys: [menuItem.menu_id]});
                                // 设置文档标题
                                document.title = menuItem.menu_name;
                            }}>
                            <Link to={menuItem.url}>{menuItem.menu_name}</Link>
                        </Item> )
                ))}
            </SubMenu>
        ));

        return (
            <Sider
                collapsible
                breakpoint="lg"
                collapsed={collapsed}
                onCollapse={onCollapse}
                trigger={collapsed}>
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


export default withRouter(Aside)