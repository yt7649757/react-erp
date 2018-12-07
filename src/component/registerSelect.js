import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AgoraActions from '../redux/action/agora/agora';
import { Select } from 'antd';

const Option = Select.Option;

class RegisterSelect extends Component {
    constructor(props) {
        super(props)
    }

    handleChange = (value) => {

    }


    render() {
        const data = this.props.data
        return (
            <Select defaultValue="请选择" onChange={this.handleChange}>
                {
                    data? (
                        Object.keys(data).map(key => {
                            return (
                                <Option key={key} value={key}>{data[key]}</Option>
                            )
                        })
                    ) : null
                }
            </Select>
        )
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



export default connect(mapStateToProps, mapDispatchToProps)(RegisterSelect)