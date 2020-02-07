import React, { Component } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './adminHeader'
import Preloader from '../../img/808.gif'
import axios from 'axios';
import '../../css/dashboard.css'
import EditEvent from '../../img/edit_event.png'
import DeleteEvent from '../../img/trash_100px.png'

class eventDashboard extends Component{
    constructor(props) {
        super(props)

        this.state = {
            showEvents: [],
            isLoading: true,
            errors: null
        }
    }

    fetchEvents = () => {
        axios.get('/api/event')
        .then(response => {
            let data = response.data;
            // console.log(data);
            let eventArr = [];
            data.forEach((val, index) => {
                eventArr.push(val);
            })
            this.setState({
                showEvents: data,
                isLoading: false
            })

            console.log(data);

        }).catch(errors => {
            this.setState({ errors, isLoading: false});
        })
    }

    getEvt = (events) => {
        let eventListArr = [];
        let event = this.state.showEvents;

        event.forEach((val, index) => {
            eventListArr.push(
                <div className="card" style={{ marginBottom: '20px' }} key={val['id']}>
                    <div className="card-header text-white" style={{ background: "linear-gradient(to left, #0F4C75 , #3282B8)" }}>
                        <div className="row">
                            <div className="col-10 mr-auto">
                                <h4>Title : {val['event_title']}</h4>
                                <h6>Deadline : {val['event_deadline']}</h6>
                            </div>
                            <div className="col-2">
                                <button className="btn btn-success" data-toggle="tooltip" data-placement="bottom" title="Edit Event"><img src={EditEvent} style={{height:'20px'}}></img></button>
                                <button className="btn btn-danger" data-toggle="tooltip" data-placement="bottom" title="Delete Event" style={{marginLeft: '10px'}}><img src={DeleteEvent} style={{height: '20px'}}></img></button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{ marginTop: '-10px' }}>
                        <b>Description : </b><p>{val['event_description']}</p>
                    </div>
                    <b>Remarks : </b><p>{val['remarks']}</p>
                </div>
            )
        })
        return eventListArr;
    }


    componentDidMount() {
        this.fetchEvents();
    }

    render(){
        const { isLoading } = this.state;

        // let myEvents = this.hasEvents(event,i);
        return(
            <div className="container-fluid">
                <AdminHeader/>
                <div className="row">
                    <AdminSidebar/>
                    <div className="container">
                        <div className="col-md-9 offset-3 mt-3" style={{ top: "20px", right: "50px" }}>
                            <div className="text-center mt-5 mb-3">
                                <div className="calendar-title">
                                    {!isLoading ? (
                                        this.getEvt()
                                    ) : (
                                        <div style={{marginTop: '200px', marginLeft: '180px'}}>
                                            <img src={Preloader}></img>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default eventDashboard;