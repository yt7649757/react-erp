import React, { Component } from 'react';
import { Modal } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tableActions from '../redux/action/table';

/**
 *   this.props.children属性。它表示组件的所有子节点
 *   @param:
 *   title   弹窗标题
 *
 */

class Layer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    hideModal = (e) => {
        if(typeof this.props.reset === 'function') {
            this.props.reset()
        }
        this.setState({
            visible: false,
        });
    }


    handleOk = (params) => {
        if(!this.props.hasState) {
            this.props.doSubmit().then(values => {
                if(values) {
                    // 提交到后台
                   const url = this.props.url
                   if(!url) return alert('沒有提交接口url')
                   this.props.tableActions.addLayerInfo(url, values)
                }
            })
        }else {
            //附件上次 单独处理
            this.child.getItemsValue().then(val => {
                if(val) {
                    console.log(val);
                }
            })
        }
    }

    //获取子组件的方法
    onRef = (ref) => {
        this.child = ref
    }


    render() {
        const title = this.props.title? this.props.title: '添加数据'
        const w = this.props.width? this.props.width : 416
        return (
            <Modal
                title= {title}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.hideModal}
                width={w}
                centered
            >
                {
                    !this.props.hasState? (
                        this.props.children
                    ): (
                        React.Children.map(this.props.children,(child,index) => {
                            return React.cloneElement(child, {onRef: this.onRef});
                        })
                    )
                }
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        table: state.table,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tableActions: bindActionCreators(tableActions, dispatch)
    }
}

//http://www.cnblogs.com/muamaker/p/9768150.html
// 由于 redux是无状态的，所以当我们在子组件中使用了 redux的时候，再父组件中，使用  ref 来获取子组件的state时，发现为一个空对象
export default connect(mapStateToProps, mapDispatchToProps,null,{withRef: true})(Layer);
