import React, { Component } from 'react';
import '../style/title.css'

class Title extends Component {
     render() {
         return (
             <div className="message-title">
                 <b style={{background: `${this.props.color}`}}></b>
                 <h6>{this.props.title}</h6>
                 {
                     this.props.more?( <a className="more" href="javasript:void(0);">查看更多>></a>):(null)
                 }
             </div>
         )
     }
}

export  default Title