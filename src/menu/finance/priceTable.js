import React, {Component} from 'react';
import Template from '../../common/template';
import axios from 'axios';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as FinanceActions from '../../redux/action/finance/finance';
import '../../style/page/print.css';
import { getId } from '../../utils/getId';

/**
 *  方式1  html渲染
 *  方式2  json遍历生成
 */

class PriceTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }


    componentDidMount() {
        // ./ ../等路径是相对public的index.html，而不是从当前的文件开始
        // axios.get('./static/price.json')
        //     .then(res => {
        //         this.setState({
        //             data: res.data
        //         })
        //     })
        document.addEventListener('contextmenu', this.doNothing);
        document.addEventListener('selectstart', this.doCopy);

        const guid = getId(this.props.history.location.pathname)
        // axios.get(`http://192.168.0.169:8001/api/erp/design/showbudgetbook/guid/${guid}/type/json`)
        //     .then(res => {
        //         if(res) {
        //             console.log(res);
        //             this.setState({
        //                 data: res.data
        //             })
        //         }
        //     })

        axios.get(`http://192.168.0.169:8001/api/erp/design/showbudgetbook/guid/${guid}/type/fase`)
            .then(res => {
                if(res) {
                    console.log(res);
                    this.setState({
                        data: res
                    })
                }
            })

    }

    doNothing = () =>{
        window.event.returnValue=false;
    }

    doCopy = (event) => {
        event.returnValue = false
    }


    componentWillUnmount() {
        document.removeEventListener('contextmenu', this.doNothing)
        document.removeEventListener('selectstart', this.doCopy)
    }

    render() {
        // const data = this.state.data
        // const user = data.user? data.user : []
        // const body = data.body ? data.body : []
        // const book = data.book ? data.book : []
        // const foot = data.foot ? data.foot : []
        return (
            <Template>
                <div className="priceTable"
                     style={{fontSize: "14px", fontFamily: 'Microsoft Yahei', color: "#474747", backgroundColor: '#fff',
                     backgroundImage: 'url("http://www.yzferp.com/static/erp/images/ERP.png")'}}
                     dangerouslySetInnerHTML={{ __html: this.state.data.data }} />

                {/*<div className="priceTable" style={{fontSize: "14px", fontFamily: 'Microsoft Yahei', color: "#474747", backgroundColor: '#fff',*/}
                    {/*backgroundImage: 'url("http://www.yzferp.com/static/erp/images/ERP.png")'}}>*/}
                    {/*<li style={{listStyle: 'none', height: '55px', marginBottom: '5px'}}>*/}
                        {/*<div style={{width: '20%', height: '50px', float: 'left', textAlign: 'center'}}>*/}
                            {/*<img width="100px" height="100%"*/}
                                 {/*src="http://www.yzferp.com/upload/show_images/f0099d4c40fa507b00f2935c613e5423/480_600"/>*/}
                        {/*</div>*/}
                        {/*<div style={{width: '50%', height: '50px', float: 'left', textAlign: 'center'}}>*/}
                            {/*<span style={{fontWeight: 'bold', fontSize: '24px'}}>深圳紫藤室内设计有限公司預算書</span>*/}
                        {/*</div>*/}
                        {/*<div style={{width: '24%', height: '50px', float: 'left', textAlign: 'right'}}>*/}
                            {/*<a style={{listStyle: 'none', height: '35px', display: 'inline-block', width: '100%'}}/>*/}
                            {/*<span>编号：{data.book_number}</span>*/}
                        {/*</div>*/}
                    {/*</li>*/}
                    {/*<table style={{borderBottom: 'none', textAlign: 'center', width: '100%'}} border={1} cellSpacing={0}*/}
                           {/*cellPadding={0}>*/}
                        {/*<tbody>*/}
                        {/*<tr style={{height: '25px'}}>*/}
                            {/*<th style={{paddingLeft: '10px', width: '20%'}} align="left">业主姓名：{book.cont_name}</th>*/}
                            {/*<th style={{paddingLeft: '10px', width: '20%'}} align="left">业主电话：{book.cont_pone}</th>*/}
                            {/*<th style={{paddingLeft: '10px', width: '20%'}} align="left">面积：{book.area}</th>*/}
                            {/*<th style={{paddingLeft: '10px', width: '30%'}} align="left">工程地址：{book.gc_adress}</th>*/}
                        {/*</tr>*/}
                        {/*<tr style={{height: '25px'}}>*/}
                            {/*<th style={{paddingLeft: '10px'}} align="left">设计师姓名：{user.name}</th>*/}
                            {/*<th style={{paddingLeft: '10px'}} align="left">设计师电话：{user.tel}</th>*/}
                            {/*<th style={{paddingLeft: '10px'}} align="left">设计风格：{book.budget_style}</th>*/}
                            {/*<th style={{paddingLeft: '10px'}} align="left">公司地址：{book.address}</th>*/}
                        {/*</tr>*/}
                        {/*</tbody>*/}
                    {/*</table>*/}
                    {/*<table style={{borderBottom: 'none', textAlign: 'center', width: '100%'}} border={1} cellSpacing={0}*/}
                           {/*cellPadding={0}>*/}
                        {/*<tbody>*/}
                        {/*<tr bgcolor="#d3d3d3" style={{height: '25px'}}>*/}
                            {/*<th rowSpan={2} style={{width: '4%'}}>编号</th>*/}
                            {/*<th rowSpan={2} style={{width: '10%'}}>工程项目</th>*/}
                            {/*<th rowSpan={2} style={{width: '3%'}}>单位</th>*/}
                            {/*<th colSpan={3} style={{width: '18%'}}>工程造价</th>*/}
                            {/*<th colSpan={5} style={{width: '25%'}}>其中</th>*/}
                            {/*<th rowSpan={2} style={{width: '41%'}}>备注</th>*/}
                        {/*</tr>*/}
                        {/*<tr bgcolor="#d3d3d3" style={{height: '25px'}}>*/}
                            {/*<th>数量</th>*/}
                            {/*<th>单价</th>*/}
                            {/*<th>金额</th>*/}
                            {/*<th>主材</th>*/}
                            {/*<th>辅材</th>*/}
                            {/*<th>人工</th>*/}
                            {/*<th>损耗</th>*/}
                            {/*<th>机械</th>*/}
                        {/*</tr>*/}
                        {/*</tbody>*/}
                    {/*</table>*/}


                    {/*{*/}
                        {/*body && body.map((item, index) => {*/}

                            {/*if (index === body.length - 1) {*/}
                                {/*return (*/}



                                    {/*<div key={index}>*/}
                                        {/*<table style={{borderBottom: 'none', textAlign: 'center', width: '100%'}} border={1}*/}
                                               {/*cellSpacing={0} cellPadding={0}>*/}
                                            {/*<tbody>*/}
                                            {/*<tr style={{height: '25px'}}>*/}
                                                {/*<th style={{width: '100px'}} colSpan={12}>{item.name}</th>*/}
                                            {/*</tr>*/}
                                            {/*</tbody>*/}
                                        {/*</table>*/}


                                        {/*<table style={{borderBottom: 'none', textAlign: 'center', width: '100%'}} border={1}*/}
                                               {/*cellSpacing={0} cellPadding={0}>*/}
                                            {/*<tbody>*/}

                                            {/*{*/}
                                                {/*item.child && item.child.map((child,index) => {*/}
                                                    {/*return (*/}
                                                        {/*<tr key={index} style={{height: '25px'}}>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '4%'}}>{child.xuhao}</td>*/}
                                                            {/*<td style={{*/}
                                                                {/*wordWrap: 'break-word',*/}
                                                                {/*width: '10%',*/}
                                                                {/*textAlign: 'left',*/}
                                                                {/*paddingLeft: '10px'*/}
                                                            {/*}}>{child.name}*/}
                                                            {/*</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '3%'}}>{child.unit}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '6%'}}>{child.number}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '6%'}}>{child.price}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '6%'}}>{child.price_sum}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '5%'}}>{child.zc_price}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '5%'}}>{child.fc_price}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '5%'}}>{child.rg_price}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '5%'}}>{child.sh_price}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '5%'}}>{child.jx_price}</td>*/}
                                                            {/*<td style={{*/}
                                                                {/*wordWrap: 'break-word',*/}
                                                                {/*wordBreak: 'break-all',*/}
                                                                {/*width: '41%',*/}
                                                                {/*textAlign: 'left',*/}
                                                                {/*paddingLeft: '10px'*/}
                                                            {/*}}>*/}
                                                                {/*{child.desc}*/}
                                                            {/*</td>*/}
                                                        {/*</tr>*/}
                                                    {/*)*/}
                                                {/*})*/}
                                            {/*}*/}

                                            {/*<tr style={{height: '25px'}}>*/}
                                                {/*<th colSpan={12} style={{textAlign: 'left', paddingLeft: '10px'}}>*/}
                                                    {/*小计：{item.xj_price} 元*/}
                                                {/*</th>*/}
                                            {/*</tr>*/}
                                            {/*<tr style={{height: '25px'}}>*/}
                                                {/*<th colSpan={12} style={{textAlign: 'left', paddingLeft: '10px'}}>备注：{item.desc}</th>*/}
                                            {/*</tr>*/}



                                            {/*</tbody>*/}
                                            {/*<tfoot>*/}

                                            {/*{*/}
                                                {/*foot && foot.map((item,index) => {*/}
                                                    {/*return (*/}
                                                        {/*<tr key={index} style={{height: '25px'}}>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '4%'}}/>*/}
                                                            {/*<td style={{*/}
                                                                {/*wordWrap: 'break-word',*/}
                                                                {/*width: '10%',*/}
                                                                {/*textAlign: 'left',*/}
                                                                {/*paddingLeft: '10px'*/}
                                                            {/*}}>*/}
                                                                {/*{item.name}*/}
                                                            {/*</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word'}}>{item.unit}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word'}}/>*/}
                                                            {/*<td style={{wordWrap: 'break-word'}}>{item.rate_value}</td>*/}
                                                            {/*<td colSpan={2} style={{*/}
                                                                {/*wordWrap: 'break-word',*/}
                                                                {/*textAlign: 'left',*/}
                                                                {/*paddingLeft: '10px'*/}
                                                            {/*}}>*/}
                                                                {/*{item.value}*/}
                                                            {/*</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word'}}/>*/}
                                                            {/*<td style={{wordWrap: 'break-word'}}/>*/}
                                                            {/*<td style={{wordWrap: 'break-word'}}/>*/}
                                                            {/*<td style={{wordWrap: 'break-word'}}/>*/}
                                                            {/*<td style={{*/}
                                                                {/*wordWrap: 'break-word',*/}
                                                                {/*textAlign: 'left',*/}
                                                                {/*paddingLeft: '10px'*/}
                                                            {/*}}>*/}
                                                                {/*{item.desc}*/}
                                                            {/*</td>*/}
                                                        {/*</tr>*/}
                                                    {/*)*/}
                                                {/*})*/}
                                            {/*}*/}


                                            {/*<tr>*/}
                                                {/*<th colSpan={12}>备注:</th>*/}
                                            {/*</tr>*/}
                                            {/*<tr>*/}
                                                {/*<td align="left" style={{padding: '10px'}} colSpan={12}>*/}
                                                    {/*{book.desc}*/}
                                                    {/*<li style={{listStyle: 'none', lineHeight: '30px'}}>*/}
                                                    {/*<span*/}
                                                        {/*style={{fontSize: '17px', fontWeight: 'bold', margin: '0 20%'}}>甲方（签字）：</span>*/}
                                                        {/*<span style={{fontSize: '17px', fontWeight: 'bold'}}>乙方（盖章）：</span>*/}
                                                    {/*</li>*/}
                                                {/*</td>*/}
                                            {/*</tr>*/}
                                            {/*</tfoot>*/}
                                        {/*</table>*/}

                                    {/*</div>*/}



                                {/*)*/}
                            {/*} else {*/}
                                {/*return (*/}
                                    {/*<div key={index}>*/}
                                        {/*<table style={{borderBottom: 'none', textAlign: 'center', width: '100%'}} border={1}*/}
                                               {/*cellSpacing={0} cellPadding={0}>*/}
                                            {/*<tbody>*/}
                                            {/*<tr style={{height: '25px'}}>*/}
                                                {/*<th style={{width: '100px'}} colSpan={12}>{item.name}</th>*/}
                                            {/*</tr>*/}
                                            {/*</tbody>*/}
                                        {/*</table>*/}
                                        {/*<table style={{borderBottom: 'none', textAlign: 'center', width: '100%'}} border={1}*/}
                                               {/*cellSpacing={0} cellPadding={0}>*/}
                                            {/*<tbody>*/}

                                            {/*{*/}
                                                {/*item.child && item.child.map((child,index) => {*/}
                                                    {/*return (*/}
                                                        {/*<tr key={index} style={{height: '25px'}}>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '4%'}}>{child.xuhao}</td>*/}
                                                            {/*<td style={{*/}
                                                                {/*wordWrap: 'break-word',*/}
                                                                {/*width: '10%',*/}
                                                                {/*textAlign: 'left',*/}
                                                                {/*paddingLeft: '10px'*/}
                                                            {/*}}>{child.name}*/}
                                                            {/*</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '3%'}}>{child.unit}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '6%'}}>{child.number}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '6%'}}>{child.price}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '6%'}}>{child.price_sum}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '5%'}}>{child.zc_price}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '5%'}}>{child.fc_price}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '5%'}}>{child.rg_price}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '5%'}}>{child.sh_price}</td>*/}
                                                            {/*<td style={{wordWrap: 'break-word', width: '5%'}}>{child.jx_price}</td>*/}
                                                            {/*<td style={{*/}
                                                                {/*wordWrap: 'break-word',*/}
                                                                {/*wordBreak: 'break-all',*/}
                                                                {/*width: '41%',*/}
                                                                {/*textAlign: 'left',*/}
                                                                {/*paddingLeft: '10px'*/}
                                                            {/*}}>*/}
                                                                {/*{child.desc}*/}
                                                            {/*</td>*/}
                                                        {/*</tr>*/}
                                                    {/*)*/}
                                                {/*})*/}
                                            {/*}*/}

                                            {/*<tr style={{height: '25px'}}>*/}
                                                {/*<th colSpan={12} style={{textAlign: 'left', paddingLeft: '10px'}}>*/}
                                                    {/*小计：{item.xj_price} 元*/}
                                                {/*</th>*/}
                                            {/*</tr>*/}
                                            {/*<tr style={{height: '25px'}}>*/}
                                                {/*<th colSpan={12} style={{textAlign: 'left', paddingLeft: '10px'}}>备注：{item.desc}</th>*/}
                                            {/*</tr>*/}

                                            {/*</tbody>*/}
                                        {/*</table>*/}

                                    {/*</div>*/}
                                {/*)*/}
                            {/*}*/}

                        {/*})*/}
                    {/*}*/}

                {/*</div>*/}
            </Template>
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


export default connect(mapStateToProps, mapDispatchToProps)(PriceTable)