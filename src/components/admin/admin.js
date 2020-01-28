import React, { Component } from 'react'
import '../../css/dashboard.css'
import axios from 'axios';

// components
import AdminHeader from './adminHeader'
import AdminSidebar from './AdminSidebar'

// images
import Back from '../../img/back.png'
import Next from '../../img/next.png'


class Admin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentMonth: '',
            currentYear: '',
            dateToday: '',
            date: '',
            eventDate: '',
            eventTitle: '',
            eventDescription: '',
            eventRemarks: ''
        }
        this.handleChangeFirst = this.handleChangeFirst.bind(this);
        this.handleChangeSecond = this.handleChangeSecond.bind(this);
        this.handleChangeThird = this.handleChangeThird.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEventDate = this.handleEventDate.bind(this);   
    }

    componentDidMount() {
        let date = new Date();
        this.setState({
            currentMonth: date.getMonth(),
            currentYear: date.getFullYear(),
            dateToday: this.ConvertMonth(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear(),
        })
    }

    handleChangeFirst = (e) => {
        this.setState({
            eventTitle: e.target.value
        });
    }

    handleChangeSecond = (e) => {
        this.setState({
            eventDescription: e.target.value
        });
    }

    handleChangeThird = (e) => {
        this.setState({
            eventRemarks: e.target.value
        });
    }

    handleEventDate = (e) => {
        this.setState({
            eventDate: sessionStorage.getItem('date_now')
        });
    }

    ConvertMonth = (month) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    }

    ISO_numeric_date = (date) => {
        return (date.getDay() === 0 ? 7 : date.getDay());
    }

    day = (day) => {
        var date = new Date();
        var newDate = new Date(date.getFullYear(), date.getMonth(), day);
        return newDate;
    }

    // getting the specific date of each td
    TestAlert = (event) => {
        sessionStorage.setItem('date_now', event.target.dataset.value);
        this.setState({
            eventDate: sessionStorage.getItem('date_now')
        });
    }

    // submit data

    handleSubmit(e) {
        e.preventDefault();

        const event_title = this.state.eventTitle;

        const event_description = this.state.eventDescription;

        const event_remarks = this.state.eventRemarks;

        const event_date = this.state.eventDate;

        console.log(event_date);

        const insertEventDate = '/api/insert-event-date';

        axios.post(insertEventDate, {
            // submit all inputs 
            eventDate: event_date,
            eventTitle: event_title,
            eventDescription: event_description,
            eventRemarks: event_remarks,
        })
        .then(response => {
            // clear inputs
            this.setState({
                eventDate: '',
                eventTitle: '',
                eventDescription: '',
                eventRemarks: ''
            });
            // redirect after submit
            window.location = "/Admin/Dashboard";
        });

         
    }


    StandardizedMonth = (month) => {
        var newMonth = month + 1;
        if (newMonth.toString().length === 1){
            return '0' + newMonth;
        }
        return newMonth;
    }

    StandardizedDay = (day) => {
        if(day.toString().length === 1){
            return '0' + day;
        }
        return day;
    }

    TableBody = () => {
        let day = 1;
        var date = new Date();
        var month = date.getMonth();
        var year = date.getFullYear();
        var startDay;
        var lastDay;
        var currentYear = this.state.currentYear;

        if (currentYear !== '') {
            month = this.state.currentMonth;
            year = this.state.currentYear
        }
        startDay = new Date(`${month + 1}-01-${year}`)
        lastDay = new Date(year, month + 1, 0)
        var week1 = this.ISO_numeric_date(startDay);
        var firstRow = [];
        var followingRow = [];

        if (week1 === 7) {
            week1 = 0;
        }
        for (var i = 0; i < 7; i++) {
            if (week1 > i) {
                firstRow.push(<td className="rowsssss" onClick={this.TestAlert} data-toggle="modal" data-target="#exampleModalLong" data-value={ year + '-' + this.StandardizedMonth(month) + '-' + this.StandardizedDay(day) + this.state.eventName} key={i} ></td>);
            }
            else {
                firstRow.push(<td className="rowsssss" onClick={this.TestAlert} data-toggle="modal" data-target="#exampleModalLong" data-value={ year + '-' + this.StandardizedMonth(month) + '-' + this.StandardizedDay(day)} key={i}>{day} <div className="event_name avoid-clicks">event name</div></td>);
                day++;
            }
        }
        day--;
        for (var x = 0; x <= 4; x++) {
            var col = [];
            for (var d = 1; d <= 7; d++) {
                if (day !== lastDay.getDate()) {
                    day++;
                    col.push(<td className="rowsssss" onClick={this.TestAlert} data-toggle="modal" data-target="#exampleModalLong" data-value={ year + '-' + this.StandardizedMonth(month) + '-' + this.StandardizedDay(day)} key={d}>{day} <div className="event_name avoid-clicks">event name</div></td>)
                }
                else {
                    col.push(<td key={d}></td>)
                }
            }
            followingRow.push(<tr key={x}>{col}</tr>)
        }
        // console.log();
        return (
            <tbody className="calendar">
                <tr>
                    {firstRow}
                </tr>
                {followingRow}
            </tbody>
        )
    }

    GotoPrevMonth = () => {
        var currMonth = this.state.currentMonth;
        var currYear = this.state.currentYear;
        if (currMonth === 0) {
            this.setState({
                currentMonth:11,
                currentYear:currYear-1,
            })
        }
        else {
            this.setState({
                currentMonth:currMonth-1,
            })
        }
    }

    GotoNextMonth = () => {
        var currMonth = this.state.currentMonth;
        var currYear = this.state.currentYear;
        if (currMonth === 11) {
            this.setState({
                currentMonth:0,
                currentYear:currYear+1,
            })
        }
        else {
            this.setState({
                currentMonth:currMonth+ 1,
            })
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <AdminHeader/>
                <div className="row">
                    <AdminSidebar/>
                    <div className="container">
                        <div className="col-md-9 offset-3 mt-3" style={{top: "20px", right: "50px"}}>
                            <div className="text-center mt-5 mb-3">
                                <div className="calendar-title">
                                    <div className="row">
                                        

                                        <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header" style={{ background: "linear-gradient(to left, #0F4C75 , #3282B8)", color: 'white' }}>
                                                        <h5 className="modal-title  text-center" id="exampleModalLongTitle">Add Event</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form>
                                                            <div className="form-group">
                                                                <input className="form-control" value={this.state.eventTitle} name="event_title" onChange={this.handleChangeFirst} placeholder="Event Title" />
                                                            </div>
                                                            <div className="form-group">
                                                                <input className="form-control" value={this.state.eventDescription} name="event_description" onChange={this.handleChangeSecond} placeholder="Event Description" />
                                                            </div>
                                                            <div className="form-group">
                                                                <input className="form-control" value={this.state.eventDate} name="event_date" onChange={this.handleEventDate}/>
                                                            </div>
                                                            <div className="form-group">
                                                                <input className="form-control" value={this.state.eventRemarks} name="event_remarks" onChange={this.handleChangeThird} placeholder="Event Remarks" />
                                                            </div>
                                                            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <button onClick={this.GotoPrevMonth} className="btn text-dark pr-2" to="/"><img id="sidebarIcon" src={Back} alt=""/></button>
                                        </div>
                                        <div className="col-6">
                                            <span className="displayedMonth">{this.ConvertMonth(this.state.currentMonth)} {this.state.currentYear}</span>
                                        </div>
                                        <div className="col-3">
                                            <button onClick={this.GotoNextMonth} className="btn text-dark pl-2" to="/"><img id="sidebarIcon" src={Next} alt="" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body p-0 m-0">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-standard mb-0" style={{ height: '480px' }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "14.30%" }} className="text-center">Sun</th>
                                                    <th style={{ width: "14.30%" }} className="text-center">Mon</th>
                                                    <th style={{ width: "14.30%" }} className="text-center">Tue</th>
                                                    <th style={{ width: "14.30%" }} className="text-center">Wed</th>
                                                    <th style={{ width: "14.30%" }} className="text-center">Thu</th>
                                                    <th style={{ width: "14.30%" }} className="text-center">Fri</th>
                                                    <th style={{ width: "14.30%" }} className="text-center">Sat</th>
                                                </tr>
                                            </thead>
                                            <this.TableBody />
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Admin