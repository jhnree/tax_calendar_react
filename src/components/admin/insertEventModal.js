import React, {Component} from 'react'
import axios from 'axios'

class insertEventModal extends Component{

    constructor(props){
        super(props);
        this.state = {
            eventTitle: '',
            eventDescription: '',
            eventRemarks: ''
        }
    }

    // alert(inputs.event_title.value + ' ' + inputs.event_description.value + ' ' + inputs.event_remarks.value);

    

    render(){
        return(
            <div>
                <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header" style={{background: "linear-gradient(to left, #0F4C75 , #3282B8)", color: 'white'}}>
                            <h5 className="modal-title  text-center" id="exampleModalLongTitle">Add Event</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div className="form-group">
                                    <input className="form-control" name="event_title"  placeholder="Event Title" />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" name="event_description"  placeholder="Event Description" />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" name="event_remarks"  placeholder="Event Remarks" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default insertEventModal