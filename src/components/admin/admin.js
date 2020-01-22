import React, { Component } from 'react'

import '../../css/dashboard.css'
import AdminHeader from './adminHeader'
import AdminSidebar from './AdminSidebar'
import Back from '../../img/back.png'
import Next from '../../img/next.png'
import InsertEventModal from './insertEventModal'

// const SubmitEvent = 'http://127.0.0.1:8000/api/insertEvent';


class Admin extends Component{
    constructor(props) {
        super(props);

        this.state = {
            currentMonth: '',
            currentYear: '',
            dateToday: '',
            date: '',
            eventName: 'test event namessss'
        }
    }

    componentDidMount() {
        let date = new Date();
        this.setState({
            currentMonth: date.getMonth(),
            currentYear: date.getFullYear(),
            dateToday: this.ConvertMonth(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear(),
        })
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

    CurrentMonth = (event) => {
        //
    }

    CurrentDay = (event) => {
        //
    }
    // getting the specific date of each td
    TestAlert = (event) => {
        alert(event.target.dataset.value + ' ' + this.state.eventName);
    }

    InsertModal = () => {

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
                firstRow.push(<td className="rowsssss" onClick={this.TestAlert} data-toggle="modal" data-target="#exampleModalLong" data-value={this.StandardizedMonth(month) + '-' + this.StandardizedDay(day) + '-' + year + this.state.eventName} key={i} ></td>);
            }
            else {
                firstRow.push(<td className="rowsssss" onClick={this.TestAlert} data-toggle="modal" data-target="#exampleModalLong" data-value={this.StandardizedMonth(month) + '-' + this.StandardizedDay(day) + '-' + year} key={i}>{day} <div className="event_name">event name</div></td>);
                day++;
            }
        }
        day--;
        for (var x = 0; x <= 4; x++) {
            var col = [];
            for (var d = 1; d <= 7; d++) {
                if (day !== lastDay.getDate()) {
                    day++;
                    col.push(<td className="rowsssss" onClick={this.TestAlert} data-toggle="modal" data-target="#exampleModalLong" data-value={this.StandardizedMonth(month) + '-' + this.StandardizedDay(day) + '-' + year} key={d}>{day} <div className="event_name">event name</div></td>)
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
                                        <InsertEventModal id="exampleModalLong"/>
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