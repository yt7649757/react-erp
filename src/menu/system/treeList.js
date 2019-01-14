import React, { Component } from 'react';
// import Template from '../../common/template'
import emitter from "../../common/ev";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SystemManageActions from '../../redux/action/system/systemManage';
import { Tree, Button, Popconfirm, message } from 'antd';
import '../../style/agora/treeList.css';
import storage from "../../utils/storage";

const TreeNode = Tree.TreeNode;


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
        if(!this._isMount) return false
        const r = storage.get('routes')
        const item = r.find(item => {
            return item.guid === 'jsqx'
        })

        this.setState({
            phone: item.phone,
            edit: item.edit
        },() => {
            const phone = this.state.phone
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
        })
    }

    componentWillUnmount() {
        this._isMount = false
    }


    componentDidMount() {
        this._isMount = true
        this.request()
        emitter.addListener('phone',() => {
            this.request()
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.systemManage.checkedTree !== this.props.systemManage.checkedTree) {
            this.setState({
                checkedKeys: nextProps.systemManage.checkedTree,
                roleTree: nextProps.systemManage.roleTree
            })
        }
    }

    render() {
        const { roleTree, checkedKeys } = this.state;
        return (
            <div>
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
            </div>
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
