import React, { Component } from 'react';
import Template from '../../common/template';
import { Button, Pagination } from 'antd';
import '../../style/other/excellentTeam.css';

const data = [{
    name: '任我行',
    label: '主任设计师',
    url: '',
    content: '我喜欢古典传统的东西，我希望在做装饰的时候把各种传统的元素变的时尚化，简练化，对比强烈又统一。',
},{
    name: '任我行',
    label: '主任设计师',
    url: '',
    content: '爱设计，更爱生活； 爱漂亮材料，也爱打折特价。 不是绘图员，我是室内设计师。',
},{
    name: '任我行',
    label: '主任设计师',
    url: '',
    content: '客户认可的才是最好的设计！',
},{
    name: '任我行',
    label: '主任设计师',
    url: '',
    content: '设计就是空间、色彩、设计回归本位。用心观察生活，感悟人生真谛，让设计与生活互动。',
},{
    name: '任我行',
    label: '主任设计师',
    url: '',
    content: '设计就是空间、色彩、设计回归本位。用心观察生活，感悟人生真谛，让设计与生活互动。',
},{
    name: '任我行',
    label: '主任设计师',
    url: '',
    content: '设计就是空间、色彩、设计回归本位。用心观察生活，感悟人生真谛，让设计与生活互动。',
},{
    name: '任我行',
    label: '主任设计师',
    url: '',
    content: '我喜欢古典传统的东西，我希望在做装饰的时候把各种传统的元素变的时尚化，简练化，对比强烈又统一。',
},{
    name: '任我行',
    label: '主任设计师',
    url: '',
    content: '我喜欢古典传统的东西，我希望在做装饰的时候把各种传统的元素变的时尚化，简练化，对比强烈又统一。',
}]

class ExcellentTeam extends Component {
    render() {
        return(
            <Template>
                <div className="teamContainer">
                    {
                       data.map((item,index) => {
                           return (
                               <div key={index} className="teamListItem">
                                   <img src={item.url} alt=""/>
                                   <div className="teamInfo">
                                       <p className="team-userInfo">{item.name}<span>{item.label}</span></p>
                                       <p className="motto">{item.content}</p>
                                       <Button style={{marginTop: '10px'}} size="small" type="primary">查看作品</Button>
                                   </div>
                               </div>
                           )
                       })
                    }
                </div>
                <div className="paging">
                    <Pagination defaultCurrent={6} total={500} />
                </div>
            </Template>
        )
    }
}

export default ExcellentTeam