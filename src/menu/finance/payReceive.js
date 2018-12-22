import React, { Component } from 'react';
import Template from '../../common/template';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as FinanceActions from '../../redux/action/finance/finance';

class PayReceive extends Component {
    render() {
        return(
            <Template>
                <div>123</div>
            </Template>
        )
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


export default connect(mapStateToProps, mapDispatchToProps)(PayReceive)