import React, {Component} from 'react';
import '../style/listItem.css'

class ListItem extends Component {

    // constructor(props) {
    //     super(props)
    // }

    render() {
        return (
            <ul className="news-list clearfix">
                {
                    this.props.data && this.props.data.length > 0 ? (
                        this.props.data.map(item => {
                            return (
                                <li key={item.id}>
                                    <a href="#" title={item.text}>
                                        <i>{item.id}</i>
                                        <p>{item.text}</p>
                                        <span className="datetime">{item.datetime}</span>
                                    </a>
                                </li>
                            )
                        })
                    ): (
                        <div className="no-message">
                            <img src={require('../asset/img/noMessage.png')} />
                            <p>暂无公告</p>
                        </div>
                    )
                }

            </ul>
        )
    }
}

export default ListItem