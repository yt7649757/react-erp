import React, { Component } from 'react';
import $ from 'jquery';
import {
    Table, Input, InputNumber, Popconfirm, Form, Button
} from 'antd';
// import Template from '../../common/template';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as FinanceActions from '../../redux/action/finance/finance';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input/>;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `请输入${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}


class ShowPayMentList extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [], editingKey: '', count: 100, isEdit: true };
        this.columns = [
            {
                title: '付款方式',
                dataIndex: 'name',
                width: '25%',
                editable: true,
            },
            {
                title: '备注说明',
                dataIndex: 'desc',
                width: '50%',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                  <EditableContext.Consumer>
                    {form => (
                        <a
                            href="javascript:;"
                            onClick={() => this.save(form, record.guid)}
                            style={{ marginRight: 8 }}
                        >
                            保存
                        </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                      title="确定取消?"
                      onConfirm={() => this.cancel(record.guid)}
                  >
                    <a>取消</a>
                  </Popconfirm>
                </span>
                            ) : (
                                <a onClick={() => this.edit(record.guid)}>编辑</a>
                            )}
                        </div>
                    );
                },
            },
        ];
    }

    isEditing = record => record.guid === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.guid);
            if(index === 0) {
                this.setState({
                    isEdit: true
                })
            }
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: ''});
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: ''});
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key },() => {
            $('#name').focus()
        });
    }

    handleAdd = (row) => {
        const { count, data, isEdit } = this.state;
        if(isEdit) {
            const newData = {
                guid: count,
                name: '',
                desc: '',
            };
            data.unshift(newData)
            this.setState({
                data: data,
                count: count + 1,
                isEdit: false
            });
            this.edit(newData.guid)
        }else {
            this.edit(data[0].guid)
        }
    }

    componentDidMount() {
        this.props.financeActions.getTableList().then(res => {
            console.log(res);
            if(res) {
                console.log(res);
                this.setState({
                    data: res.data
                })
            }
        })
    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    新增
                </Button>
                <Table
                    rowKey={record => record.guid }
                    style={{backgroundColor: '#fff'}}
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    size="middle"
                />
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        finance: state.finance,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        financeActions: bindActionCreators(FinanceActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShowPayMentList)