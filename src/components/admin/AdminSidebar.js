import React, { Component } from 'react'
import {Link} from 'react-router-dom'
// import UserCounts from './adminHeader'
import '../../css/login.css'
import Submission from '../../img/submission.png'
import Filing from '../../img/filing.png'
import Users from '../../img/users.png'
import Reports from '../../img/reports.png'
import Payments from '../../img/payments.png'
import TaxAlert from '../../img/tax_alert.png'
import EventIcon from '../../img/event.png'

class AdminSidebar extends Component{
    render(){
        return(
            <nav className="col-2 px-1 position-fixed" id="test" style={{background: '#1B262C'}}>
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item" id="sidebar-item">
                        </li>
                        {/* <li className="nav-item">
                            <div className="nav-link" id="customSideBar">
                                <span data-feather="file"></span>
                                <div className="customFont">Submission<img id="sidebarIcon" src={Submission} alt=""/></div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" id="customSideBar">
                                <span data-feather="shopping-cart"></span>
                                <div className="customFont">e-Filing<img id="sidebarIcon" src={Filing} alt="" /></div>
                            </div>
                        </li> */}
                        <li className="nav-item">
                            <div className="nav-link" id="customSideBar">
                                <span data-feather="users"></span>
                                <Link className="customFont" to="/Admin/UserCounts" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Users<img id="sidebarIcon" src={Users} alt="" /></Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" id="customSideBar">
                                <span data-feather="bar-chart-2"></span>
                                <div className="customFont">Event Dashboard<img id="sidebarIcon" src={EventIcon} alt="" /></div>
                            </div>
                        </li>
                        {/* <li className="nav-item">
                            <div className="nav-link" id="customSideBar">
                                <span data-feather="layers"></span>
                                <div className="customFont">e-Payments<img id="sidebarIcon" src={Payments} alt="" /></div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link" id="customSideBar">
                                <span data-feather="layers"></span>
                                <div className="customFont">Tax Alerts<img id="sidebarIcon" src={TaxAlert} alt="" /></div>
                            </div>
                        </li> */}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default AdminSidebar