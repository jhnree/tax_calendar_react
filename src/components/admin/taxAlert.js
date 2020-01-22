import React, { Component } from 'react'
// import Pagination from 'react-js-pagination'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './adminHeader'
// import { Link } from 'react-router-dom'

class taxAlert extends Component{

    constructor(props){
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            value: event.target.value.toUpperCase()
        });
    }

    handleSubmit(event){
        alert('A name was submitted:' + this.state.value);
        event.preventDefault();
    }


    render(){
        return(
            <div className="container-fluid">
             <AdminHeader/>
                <div className="row">
                    <AdminSidebar/>
                   <div className="container">
                        <div className="col-10 offset-3 mt-3" style={{ top: "40px", right: "70px" }}>
                            <form className="mt-5">
                                <div className="form-group">
                                    <input placeholder="Title" className="form-control" value={this.state.value} onChange={this.handleChange}/>
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                   </div>
                </div>
            </div>
        )
    }
}

export default taxAlert