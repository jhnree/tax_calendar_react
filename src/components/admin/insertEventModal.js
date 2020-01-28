import React, {Component} from 'react'
import axios from 'axios'
import { BrowserRouter} from 'react-router-dom';
class insertEventModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            eventTitle: '',
            eventDescription: '',
            eventRemarks: ''
        }
        this.handleChangeFirst = this.handleChangeFirst.bind(this);
        this.handleChangeSecond = this.handleChangeSecond.bind(this);
        this.handleChangeThird = this.handleChangeThird.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);    
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

    handleSubmit(e){
        e.preventDefault();

        // alert([this.state.eventTitle, this.state.eventDescription, this.state.eventRemarks]);


        // const qwerty = {
        //     event_title: this.state.eventTitle,
        //     event_description: this.state.eventDescription,
        //     remarks: this.state.eventRemarks
        // }

        const event_title = this.state.eventTitle;

        const event_description = this.state.eventDescription;

        const event_remarks = this.state.eventRemarks;

        const insertEventDateList = '/api/insert-event-list';
        const insertEventDate = '/api/insert-event-date';
        axios.post(insertEventDate, { event_title, event_description, event_remarks })
            .then(response => {
                console.log(response.data);
            });

        // axios.post('/api/insertEvents',events)
        // .then(res => {
        //     alert(res);
        //     console.log(res);
        //     console.log(res.data);
        // })

        // const uri = 'http://127.0.0.1:8000/events';

        // axios.post(uri, event).then((response) => {
        //     console.log('success');
        //     BrowserRouter.push('/Admin/Dashboard');
        // });
    }
    render(){
        return(
            <div>
                
            </div>
        )
    }
}

export default insertEventModal