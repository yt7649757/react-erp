import React, { Component } from 'react';
import Template from '../../common/template'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SystemManageActions from '../../redux/action/system/systemManage';
import { Tree, Button, Popconfirm, message } from 'antd';
import '../../style/agora/treeList.css';
import storage from "../../utils/storage";

const TreeNode = Tree.TreeNode;

// const treeData = [{
//     title: '0-0',
//     key: '0-0',
//     children: [{
//         title: '0-0-0',
//         key: '0-0-0',
//         children: [
//             { title: '0-0-0-0', key: '0-0-0-0' },
//             { title: '0-0-0-1', key: '0-0-0-1' },
//             { title: '0-0-0-2', key: '0-0-0-2' },
//         ],
//     }, {
//         title: '0-0-1',
//         key: '0-0-1',
//         children: [
//             { title: '0-0-1-0', key: '市场营销' },
//             { title: '市场营销11', key: '0-0-1-1' },
//             { title: '0-0-1-2', key: '0-0-1-2' },
//         ],
//     }, {
//         title: '0-0-2',
//         key: '0-0-2',
//     }],
// }, {
//     title: '0-1',
//     key: '0-1',
//     children: [
//         { title: '0-1-0-0', key: '0-1-0-0' },
//         { title: '0-1-0-1', key: '0-1-0-1' },
//         { title: '0-1-0-2', key: '0-1-0-2' },
//     ],
// }, {
//     title: '0-2',
//     key: '0-2',
// }];

class TreeList extends Component {
    state = {
        expandedKeys: [],
        autoExpandParent: false,
        checkedKeys: [],
        selectedKeys: [],
        id: '',
        phone: false,
        edit: false,
        loading: false,
        roleTree: []
    }

    onExpand = (expandedKeys) => {
        // console.log('onExpand', expandedKeys);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onCheck = (checkedKeys) => {
        // console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    }

    onSelect = (selectedKeys, info) => {
        // console.log('onSelect', info);
        this.setState({ selectedKeys });
    }

    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.guid} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} key={item.guid} />;
        });
    }


    updateTree = () => {
        const { checkedKeys, phone } = this.state
        let url = this.props.location.pathname
        url = url.substring(0, url.length-1) + '1'
        this.setState({loading: true})
        const _this = this
        if(phone) {
            let obj = {}
            checkedKeys.map(item => {
                return obj[item] = {is_mobile: 1}
            })
            this.props.systemManageActions.updateRoleTree(url,obj).then(function (data) {
                if(data) {
                    _this.setState({
                        loading: false
                    })
                    message.info('修改手机权限成功')
                }
            })
        }else {

            this.props.systemManageActions.updateRoleTree(this.props.location.pathname,checkedKeys).then(function (data) {
                if(data) {
                    _this.setState({
                        loading: false
                    })
                    message.info('修改PC权限成功')
                }
            })
        }
    }

    request = () => {
        const { phone } = this.state;
        const treeUrl = '/api/erp/system/shownodejson/top/1/is_mobile/0';
        const phoneTreeUrl = '/api/erp/system/shownodejson/top/1/is_mobile/1';
        let url = this.props.location.pathname
        url = url.substring(0, url.length-1) + '1';
        if(phone) {
           this.props.systemManageActions.getTreeList(phoneTreeUrl).then(res => {
               if(res === 'ok') {
                   this.props.systemManageActions.getCheckedTree(url)
               }
           })
        }else {
           this.props.systemManageActions.getTreeList(treeUrl).then(res => {
               if(res === 'ok') {
                   this.props.systemManageActions.getCheckedTree(this.props.location.pathname)
               }
           })
        }
    }

    componentWillMount() {
        const r = storage.get('routes')
        r.map(item => {
            if(item.guid === 'jsqx') {
                this.setState({
                    phone: item.phone,
                    edit: item.edit
                })
            }
            return true
        })
    }

    componentWillUnMount() {

    }


    componentDidMount() {
        this.request()
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps) {
            this.setState({
                checkedKeys: nextProps.systemManage.checkedTree,
                roleTree: nextProps.systemManage.roleTree
            })
        }
    }

    render() {
        const { roleTree, checkedKeys } = this.state;
        return (
            <Template>
                <div className="role-tree">
                    <Tree
                        showLine={true}
                        checkable
                        onExpand={this.onExpand}
                        expandedKeys={this.state.expandedKeys}
                        autoExpandParent={this.state.autoExpandParent}
                        onCheck={this.onCheck}
                        checkedKeys={checkedKeys}
                        onSelect={this.onSelect}
                        selectedKeys={this.state.selectedKeys}
                    >
                        {
                           roleTree ? this.renderTreeNodes(roleTree) : null
                        }
                    </Tree>
                    {
                        this.state.edit? (
                            <Popconfirm placement="topLeft" title={'你确认要修改吗?'} onConfirm={this.updateTree} okText="确认" cancelText="取消">
                                <Button type="primary" className="tree-btn" loading={this.state.loading} >
                                    确认修改
                                </Button>
                            </Popconfirm>
                        ): null
                    }
                </div>
            </Template>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        systemManage: state.systemManage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        systemManageActions: bindActionCreators(SystemManageActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TreeList)
