import React, { Component } from 'react';
import '../../css/dashboard.css';
import Header from './header';

class Dashboard extends Component {

    constructor(props){
        super(props)

        this.state = {
            currentMonth:'',
            currentYear:'',
            dateToday:'',
            dayToday:'',
            date:'',
            userId:localStorage.getItem("id"),
            EventList:[],
            eventToDisplay:[],
        }
        this.EventList();
    }

    componentDidMount(){
        let date = new Date();
        // let concatDate = date.getFullYear() + '-' + this.standardizedMonth(date.getMonth()) + '-' + date.getDate()
        // console.log(concatDate)
        this.setState({
            currentMonth:date.getMonth(),
            currentYear:date.getFullYear(),
            dateToday:this.ConvertMonth(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear(),
            dayToday:this.ConvertDay(date.getDay()),
        })
    }

    ConvertDay = (day) => {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[day];
    }

    ConvertMonth = (month) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
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

    EventList = (year, month, day) => {
        let date = new Date();
        let concatDate = date.getFullYear() + '-' + this.standardizedMonth(date.getMonth()) + '-' + date.getDate()
        // console.log(concatDate)
        const ApiLink = 'api/dailyEvent'
        fetch(ApiLink, 
                {
                    method:'get', 
                    headers: {
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                        },
                })
        .then(response => response.json())
        .then(json => {
            let arr = []
            json.forEach(( val, index ) => {
                if(val.event_deadline === concatDate){
                    arr.push(val)
                }
            })
            this.setState({ 
                eventToDisplay: arr.length ? arr : [],
                EventList: json 
            })
            
        })
        .catch(console.log())
    }

    isToday = (month, day, year) => {
        var date = new Date();
        var m = date.getMonth();
        var d = date.getDate();
        var y = date.getFullYear();
        var today = m + '-' + d + '-' + y;
        var toCheck = month + '-' + day + '-' + year;
        if(today === toCheck){
            return true;
        }
        return false;
    }

    standardizedMonth = (month) => {
        var m = month.toString();
        return m.length === 1 ? '0' + (month + 1) : month + 1;
    }

    standardizedDay = (day) => {
        var d = day.toString();
        return d.length === 1 ? '0' + day : day;
    }

    hasEvent = (year, month, day) => {
        var date = year + '-' + this.standardizedMonth(month) + '-' + this.standardizedDay(day);
        var events = this.state.EventList;
        var arr = [];
        events.forEach((val, index)=>{
            if(val['event_deadline'] === date){
                arr.push(val);
            }
        })
        return arr;
    }

    sample = (i, event, day) => {
        var td = [];
        event.forEach((val, index)=>{
            td.push(<div className="event avoid-clicks" key={val['id']} >
                        {val['event_title']}
                    </div>)
        })
        return td;
    }

    dayClick(event) {
        var eventDate = event.target.dataset.value
        var events = this.state.EventList
        var arr = []
        var date = new Date(eventDate)
        events.forEach((val, index)=>{
            if(val['event_deadline'] === eventDate){
                arr.push(val)
            }
        })
        this.setState({ 
            eventToDisplay: arr.length ? arr : [],
            dayToday: this.ConvertDay(date.getDay()),
            dateToday: this.ConvertMonth(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear(),
        })
    }

    SideNavEventDisplay = () => {
        var dayClicked = this.state.eventToDisplay
        var jsxToReturn = []
        const title = {
            fontSize: '1.3rem',
            fontWeight: '600',
            align: 'center'
        }

        const description = {
            fontSize: '1rem',
            fontWeight: '300',
        }
        
        const remarks = {
            fontSize: '.8rem',
            fontWeight: '100',
        }

        if(dayClicked.length){
            dayClicked.forEach((val, index) => {
                if(val.remarks !== ""){
                    jsxToReturn.push(<div key={val.id} className="">
                                        <span style={title}>{val.event_title}</span><br/>
                                        <span style={description}>{val.event_description}</span><br/><br/>
                                        <span style={remarks}>{val.remarks}</span><br/>
                                        <hr/>
                                    </div>)
                }
                else{
                    jsxToReturn.push(<div key={val.id} className="">
                                        <span style={title}>{val.event_title}</span><br/>
                                        <span style={description}>{val.event_description}</span>
                                        <hr/>
                                    </div>)
                }
            })
        }
        else{
            jsxToReturn.push(<div key="1" className="text-center pt-2">
                                <span style={title}>No Event</span><br/>
                                <hr/>
                            </div>)
        }
        return jsxToReturn
    }
    
    TableBody = () => {
        let day=1;
        var date = new Date();
        var month = date.getMonth();
        var year = date.getFullYear();
        var startDay;
        var lastDay;
        var currentYear = this.state.currentYear;
        // var Events = this.state.EventList;
        
        if(currentYear !== ''){
            month = this.state.currentMonth;
            year = this.state.currentYear
        }
        startDay = new Date(`${month + 1}-01-${year}`)
        lastDay = new Date(year, month + 1, 0)
        var week1 = this.ISO_numeric_date(startDay);
        var firstRow = [];
        var followingRow = [];
        
        if(week1 === 7){
            week1 = 0;
        }

        for(var i = 0; i < 7; i++){
            if(week1 > i){
                firstRow.push(<td className="rowsssss" key={i}></td>);
            }
            else{
                let event = this.hasEvent(year,month,day);
                if(this.isToday(month, day, year)){
                    if(typeof event === 'undefined'){
                        firstRow.push(<td key={i} onClick={this.dayClick.bind(this)} data-value={year + '-' + this.standardizedMonth(month) + '-' + this.standardizedDay(day)} className="date-button"><span className="today">{day}</span></td>);
                    }
                    else{
                        firstRow.push(<td key={i} onClick={this.dayClick.bind(this)} data-value={year + '-' + this.standardizedMonth(month) + '-' + this.standardizedDay(day)} className="date-button"><span className="today">{day}</span>{this.sample(i, event, day)}</td>);
                    }
                }
                else{
                    if(typeof event === 'undefined'){
                        firstRow.push(<td key={i} onClick={this.dayClick.bind(this)} data-value={year + '-' + this.standardizedMonth(month) + '-' + this.standardizedDay(day)} className="date-button"><span>{day}</span></td>);
                    }
                    else{
                        firstRow.push(<td key={i} onClick={this.dayClick.bind(this)} data-value={year + '-' + this.standardizedMonth(month) + '-' + this.standardizedDay(day)} className="date-button"><span>{day}</span>{this.sample(i, event, day)}</td>);
                    }
                }
                day++;
            }
        }

        day--;
        
        for(var x = 0; x <= 4; x++){                                                                                                                                                                                                                                                                                     
            var col = [];
            for(var d = 1; d <= 7; d++){
                if(day!==lastDay.getDate()){
                    day++;
                    let event = this.hasEvent(year,month,day);
                    if(this.isToday(month, day, year)){
                        if(typeof event === 'undefined'){
                            col.push(<td key={d} onClick={this.dayClick.bind(this)} data-value={year + '-' + this.standardizedMonth(month) + '-' + this.standardizedDay(day)} className="date-button"><span className="today">{day}</span></td>)
                        }
                        else{
                            col.push(<td key={d} onClick={this.dayClick.bind(this)} data-value={year + '-' + this.standardizedMonth(month) + '-' + this.standardizedDay(day)} className="date-button"><span className="today">{day}</span>{this.sample(i, event, day)}</td>)
                        }
                    }
                    else{
                        if(typeof event === 'undefined'){
                            col.push(<td key={d} onClick={this.dayClick.bind(this)} data-value={year + '-' + this.standardizedMonth(month) + '-' + this.standardizedDay(day)} className="date-button"><span>{day}</span></td>)
                        }
                        else {
                            col.push(<td key={d} onClick={this.dayClick.bind(this)} data-value={year + '-' + this.standardizedMonth(month) + '-' + this.standardizedDay(day)} className="date-button"><span>{day}</span>{this.sample(i, event, day)}</td>)
                        }
                    }
                }
                else{
                    col.push(<td key={d}></td>)
                }
            }
            followingRow.push(<tr key={x}>{col}</tr>)
        }
        return(
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
        if(currMonth === 0){
            this.setState({
                currentMonth:11,
                currentYear:currYear-1,
            })
        }
        else{
            this.setState({
                currentMonth:currMonth-1,
            })
        }
    }

    GotoNextMonth = () => {
        var currMonth = this.state.currentMonth;
        var currYear = this.state.currentYear;
        if(currMonth === 11){
            this.setState({
                currentMonth:0,
                currentYear:currYear+1,
            })
        }
        else{
            this.setState({
                currentMonth:currMonth+1,
            })
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <Header/>
                <div className="row pt-5">
                    <div className="col-md-3 shadow sidenav d-none d-md-block p-4">
                        <div>
                            <span className="current">{this.state.dateToday}</span><br/>
                        </div>
                        <div>
                            <span className="current-day">{this.state.dayToday}</span>
                        </div>
                        <hr/>
                        <div className="text-center mt-4 title pb-2">Deadlines</div>
                        <div className="events rounded p-3 shadow">
                            <this.SideNavEventDisplay/>
                        </div>
                    </div>
                    <div className="col-md-9 offset-md-3 mt-4">
                        <div className="text-center mb-3">
                            <div className="calendar-title">
                                <div className="row">
                                    <div className="col-1">
                                        <button onClick={this.GotoPrevMonth} className="btn"><i className="fas fa-chevron-left"/></button>
                                    </div>
                                    <div className="col-10">
                                        <span className="displayedMonth">{this.ConvertMonth(this.state.currentMonth)} {this.state.currentYear}</span>
                                    </div>
                                    <div className="col-1">
                                        <button onClick={this.GotoNextMonth} className="btn"><i className="fas fa-chevron-right"/></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body p-0 m-0">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-standard mb-0" style={{height: '480px'}}>
                                        <thead>
                                            <tr>
                                                <th style={{width: "14.30%"}} className="text-center">Sun</th>
                                                <th style={{width: "14.30%"}} className="text-center">Mon</th>
                                                <th style={{width: "14.30%"}} className="text-center">Tue</th>
                                                <th style={{width: "14.30%"}} className="text-center">Wed</th>
                                                <th style={{width: "14.30%"}} className="text-center">Thu</th>
                                                <th style={{width: "14.30%"}} className="text-center">Fri</th>
                                                <th style={{width: "14.30%"}} className="text-center">Sat</th>
                                            </tr>
                                        </thead>
                                        <this.TableBody/>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;