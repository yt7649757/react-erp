import React, {Component} from 'react';
import { Modal, message } from 'antd';

const confirm = Modal.confirm;

const TableHoc = (WrappedComponent,path) => class extends WrappedComponent {

    showConfirm = () => {
        const _this = this;
        console.log(this.instanceComponent);
        const {selectedRows} = this.instanceComponent.state;
        if (selectedRows.length === 0) {
            return message.info('请至少选择一行数据')
        }
        confirm({
            title: '你确定要删除吗?',
            content: '',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                _this.instanceComponent.deleteRow()
            },
            onCancel() {
            },
        });
    }

    render() {
        return (<WrappedComponent
            {...this.props}
            showConfirm = {this.showConfirm}
            ref={instanceComponent => this.instanceComponent = instanceComponent}
        />)
    }

}


export default TableHoc