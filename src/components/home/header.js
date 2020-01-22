import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../auth';
import axios from 'axios';
import TimeAgo from 'timeago-react';

class Header extends Component {

    constructor(props){
        super(props)
        this.state = {
            hashedID:localStorage.getItem("id"),
            userName:'',
            user:[],
            notification:[],
        }
    }

    componentDidMount(){
        axios.post('/api/all-user', { hashed: this.state.hashedID })
        .then( val => {
            this.setState({ userName: val.data.username, user: val.data, id: val.data.id })
            this.setNotification(val.data.id)
        } )
    }

    setNotification(id){
        axios.get(`/api/user-event-notification/${id}`)
        .then( val => {
            this.setState({ notification: val.data })
        } )
    }
    
    componentWillUnmount(){
        localStorage.clear()
    }

    Notification = () => {
        var notification = this.state.notification;
        var jsx = [];
        if(notification){
            notification.forEach(( val, index ) => {
                jsx.push(<div className="notification-content" key={index}>
                            <button className="btn form-control btn-success dropdown-item py-2" data-value={val.id}>
                                <span className="notification-title m-0 p-0">{val.event_title}</span><br/>
                                <span>{this.cutLongText(val.event_description)}</span>
                                <span className="time pl-2">(<TimeAgo datetime={val.updated_at} />)</span>
                            </button>
                            <hr className="m-1"/>
                        </div>)
            })
        }
        return jsx;
    }

    cutLongText = (text) => {
        if(text.length > 25){

            return text.substring(0,27) + '...';

        }
        return text;
    }

    NotificationCount = () => {
        var notification = this.state.notification;
        return <span className="badge rounded-circle" id="notificationCount">{notification.length}</span>
    }
    
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-standard fixed-top">
                <Link className="link" to="/Dashboard">Tax Calendar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown" id="notif">
                            <button className="btn nav-link bell" id="notification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" to="/">
                                <i className="far fa-bell"></i>
                                <this.NotificationCount/>
                            </button>
                            <div id="notificationDropdown" className="pt-0 dropdown-menu dropdown-menu-right" aria-labelledby="notification" style={{width: "300px"}}>
                                <div className="bg-white pt-2 sticky-top"><p className="dropdown-header">Notifications</p><hr className="m-0 mb-2"/></div>
                                <this.Notification/>
                            </div>
                        </li> 
                        <li className="nav-item dropdown">
                            <button className="btn nav-link" id="profile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="profile-icon"></i></button>
                            <div id="profile-menu" className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownId">
                                <label className="dropdown-item">{this.state.userName}</label>
                                <hr className="my-1"/>
                                <Link to="/" className="btn dropdown-item" onClick={() => { auth.Logout( () => {} ) } }><i className="log-out-icon"></i><span className="pl-2">Logout</span></Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;