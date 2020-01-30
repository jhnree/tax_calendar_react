import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import auth from '../auth';
import axios from 'axios';
import TimeAgo from 'timeago-react';
import { Button, Modal, Badge, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../../css/header.css';

class Header extends Component {

    constructor(props){
        super(props)
        var userId = localStorage.getItem("id")
        this.state = {
            hashedID:userId,
            userName:'',
            id:'',
            user:[],
            notification:[],
            eventTitle:'',
            eventDescription:'',
            eventDate:'',
            eventRemarks:'',
            upcomingDeadline:'',
            isShown:true,
        }
    }

    componentDidMount(){
        axios.post('/api/all-user', { hashed: this.state.hashedID })
        .then( val => {
            this.setState({ userName: val.data.username, user: val.data, id: val.data.id})
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
                            <button data-target="#notificationModal" data-toggle="modal" onClick={this.showNotification} className="btn form-control btn-success dropdown-item py-2" data-value={val.id}>
                                <span className="avoid-clicks notification-title m-0 p-0">{val.event_title}</span><br/>
                                <span className="avoid-clicks">{this.cutLongText(val.event_description)}</span>
                                <span className="avoid-clicks time pl-2">(<TimeAgo datetime={val.updated_at} />)</span>
                            </button>
                            <hr className="m-1"/>
                        </div>)
            })
        }
        return jsx;
    }

    convertDate(date){
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        var dateSplit = date.split('-')
        var month = dateSplit[1]
        return months[parseInt(month) - 1] + ' ' + dateSplit[2] + ', ' + dateSplit[0]
    }


    showNotification = (event) => {
        var eventId = event.target.dataset.value
        var notificationList = this.state.notification
        notificationList.forEach((value, index) => {
            let val = parseFloat(value.id);
            let id = parseFloat(eventId)
            if(val === id){
                this.setState({
                    eventTitle: value.event_title,
                    eventDescription: value.event_description,
                    eventRemarks: value.remarks,
                    eventDate: this.convertDate(value.event_deadline)
                })
            }
        })
        
        axios.post('/api/notification/seen', { eventId: eventId, userId: this.state.id})
        .then(result => {
            console.log(result.data)
        })

        this.setNotification(this.state.id)

        return false;
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

    UpcomingDeadlineModal() {
        const oneDay = JSON.parse(sessionStorage.getItem('0'));
        const threeDays = JSON.parse(sessionStorage.getItem('1'));
        const sevenDays = JSON.parse(sessionStorage.getItem('2'));
        const [show, setShow] = useState(JSON.parse(localStorage.getItem('show')));
        const handleClose = () => {
            localStorage.setItem('show', false)
            localStorage.setItem('test', '0')
            setShow(false)
        };
        return (
          <>
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center" style={{ width: '100%' }}>Upcoming Deadlines</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table id="deadline" bordered responsive>
                        <thead>
                            <tr>
                                <th colSpan="2">Event Title</th>
                                <th className="text-center">Remaining Days</th>
                            </tr>
                        </thead>
                        <tbody>
                            {oneDay ? oneDay.map((value, key) => {
                                return <tr key={value['id']}>
                                        <td colSpan="2">{value['event_title']}</td>
                                        <td className="text-center"><Badge style={{ width: '70px', height: '20px', paddingTop: '5px', fontSize: '.75rem' }} variant="danger">1 day</Badge></td>
                                    </tr>
                            }) : <> </>}
                            {threeDays ? threeDays.map((value, key) => {
                                return <tr key={value['id']}>
                                        <td colSpan="2">{value['event_title']}</td>
                                        <td className="text-center"><Badge style={{ width: '70px', height: '20px', paddingTop: '5px', fontSize: '.75rem' }} variant="warning">3 days</Badge></td>
                                    </tr>
                            }) : <></>}
                            {sevenDays ? sevenDays.map((value, key) => {
                                return <tr key={value['id']}>
                                        <td colSpan="2">{value['event_title']}</td>
                                        <td className="text-center"><Badge style={{ width: '70px', height: '20px', paddingTop: '5px', fontSize: '.75rem' }} variant="info">7 days</Badge></td>
                                    </tr>
                            }) : <></>}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
          </>
        );
      }
    
    render() {
        return (
            <div>
                {localStorage.getItem('test') === '1' ? <this.UpcomingDeadlineModal/> : <> </>}
                <div className="modal fade" id="notificationModal" role="dialog" aria-modal="true" style={{paddingRight: '10px'}}>
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header f-default letter-space-1">
                                <h4 className="modal-title">{this.state.eventDate}</h4>
                                <button type="button" className="close mx-0" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <span id="titles">{this.state.eventTitle}</span>
                                <br/>
                                <span id="descriptions">
                                    <p>{this.state.eventDescription}</p>
                                </span>
                                <br/>
                                <span id="remark">{this.state.eventRemarks}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-standard fixed-top">
                    <Link className="link" to="/Dashboard">Tax Calendar</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown" id="notif">
                                <button className="btn nav-link bell" id="notification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" to="/">
                                    {/* <i className="far fa-bell"></i> */}
                                    <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
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
            </div>
        );
    }
}

export default Header;