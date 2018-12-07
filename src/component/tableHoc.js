import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../redux/action/agora/agora';

const TableHoc = (WrappedComponent,path) => class extends WrappedComponent {

    //自定义事件
    // handleClick = (params) => {
    //     alert(params)
    //     console.log(this.instanceComponent.state.url)
    // }

    state = {
        total: '',
    }

    componentDidMount() {
        this.props.agoraActions.getTables(this.instanceComponent.state.url).then(val => {

        })
    }


    handleTableChange = (pagination) => {
        console.log(pagination)
    }

    render() {
        const _this = this
        const pagination = {
            total: this.props.agora.tableList.total,
            showQuickJumper: true,
            showTotal: function () {
                return `总共有${_this.props.agora.tableList.total}条数据`
            }
        }



        return (<WrappedComponent
            {...this.props}
            pagination = {pagination}
            ref={instanceComponent => this.instanceComponent = instanceComponent}
        />)
    }

}

const mapStateToProps = (state) => {
    return {
        agora: state.agora,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        agoraActions: bindActionCreators(AgoraActions, dispatch)
    }
}


// export default connect(mapStateToProps, mapDispatchToProps)(TableHoc)
export default TableHoc