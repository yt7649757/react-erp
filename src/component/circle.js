import React, { Component } from 'react';
import '../style/circle.css'

var rotate = ''

export default class Circle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            r: 'width-none',
            c: '',
            rotate: 30  //角度
        }
    }

    componentDidMount() {
        rotate = this.state.rotate
        if(rotate > 50) {
            this.setState({
                c: 'auto',
                r: ''
            })
        }else if(rotate >= 100) {
            this.setState({
                rotate: 0,
                c: '',
                r: 'width-none'
            })
        }
    }


    render() {
        console.log(rotate)
        return (
            <div className="circle">
                <div className={`clip ${this.state.c}`}>
                    <div className="left" style={{transform: `rotate(${3.6 * rotate}deg)`}}></div>
                    <div className={`right ${this.state.r}`}></div>
                </div>
                <div className="circle-txt">
                    <p>274</p>
                    <p>day</p>
                </div>
            </div>
        )
    }
}