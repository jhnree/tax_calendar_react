import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
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
                            <Link className="nav-link bell" id="notification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" to="/">
                                <i className="far fa-bell"></i>
                                <span className="badge rounded-circle" id="notificationCount"></span>
                            </Link>
                            <div id="notificationDropdown" className="pt-0 dropdown-menu dropdown-menu-right" aria-labelledby="notification" style={{width: "300px"}}>
                                
                            </div>
                        </li> 
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#" id="profile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="profile-icon"></i></a>
                            <div id="profile-menu" className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownId">
                                <label className="dropdown-item">asd</label>
                                <hr className="my-1"/>
                                <Link className="dropdown-item" to="/logout"><i className="log-out-icon"></i><span className="pl-2">Logout</span></Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;