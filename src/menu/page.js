import React, {Component} from 'react';
import Template from '../common/template'
import {Rate} from 'antd';

class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 3,
        };
    }

    componentDidMount() {

    }

    handleChange = (value) => {
        this.setState({value});
    }


    render() {
        const {value} = this.state;
        return (
            <Template>
                       <span>
                        <Rate onChange={this.handleChange} value={value}/>
                                           {value && <span className="ant-rate-text">{value} stars</span>}
                      </span>
            </Template>
        )
    }
}

export default Page;

