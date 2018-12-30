import React, { Component } from 'react';
import { Modal } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tableActions from '../redux/action/table';
import Protypes from 'prop-types';

/**
 *   @param:
 *   title   弹窗标题
 *   width   弹窗宽度
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
                   const url = this.props.url
                   if(!url) return alert('沒有提交接口url')
                   this.props.tableActions.addLayerInfo(url, values)
                }
            })
        }else {
            this.child.getItemsValue().then(val => {
                if(val) {
                    console.log(val);
                }
            })
        }
    }

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
                footer={this.props.footer}
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

Layer.Protypes = {
    title: Protypes.string,
    width: Protypes.number,
    footer: Protypes.object
}

export default connect(mapStateToProps, mapDispatchToProps,null,{withRef: true})(Layer);
