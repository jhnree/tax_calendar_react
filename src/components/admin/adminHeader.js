
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NotifBell from '../../img/notification.png'
import RedDot from '../../img/red_dot.png'
import '../../css/login.css'
// import UserCounts from './adminHeader'


class adminHeader extends Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ background: "linear-gradient(to left, #0F4C75 , #3282B8)"}}>
                    <Link className="link" to="/Admin/Dashboard">ADMIN DASHBOARD</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown" id="notif">
                                {/* <Link className="nav-link bell" id="notification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" to="/">
                                    <i className="far fa-bell"></i>
                                    <span className="badge rounded-circle" id="notificationCount"></span>
                                </Link> */}
                                <a href="/"className="nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <img src={NotifBell} alt="" className="notifBell" /></a>
                                   
                                <div id="notificationDropdown" className="pt-0 dropdown-menu dropdown-menu-right" aria-labelledby="notification" style={{ width: "300px" }}>
                                    <div className="dropdown-item mt-2 notifBell"><img className="red-dot" src={RedDot} alt="" /><a href="/" className="dropdown-item-list">Test Notification</a></div>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="/" id="profile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="profile-icon"></i></a>
                                <div id="profile-menu" className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownId">
                                    <Link to="/Admin/Dashboard" className="dropdown-item">Profile</Link>
                                    <hr className="my-1" />
                                    <Link to="/Admin/Dashboard" className="dropdown-item"><i className="log-out-icon"></i><span className="pl-2">Logout</span></Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default adminHeader