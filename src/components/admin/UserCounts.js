import React, { Component } from 'react'
import AdminHeader from './adminHeader'
// import { Link } from 'react-router-dom';
// import UserGroup from '../../img/user_groups.png'
// import UnSubmittedDocument from '../../img/docu.png'
// import ForFiling from '../../img/file_folder.png'
import AdminSidebar from './AdminSidebar'
import '../../css/custom.scss'
import '../../css/userCount.css'
import MaleUser from '../../img/male_user.png'
import FemaleUser from '../../img/female_user.png'
import Users from '../../img/users1.png'
import AddUser from '../../img/add_user.png'

let NumberOfMale = 70;
let NumberOfFemale = 30;
let result = NumberOfMale + NumberOfFemale;
/**
 * !! computing into percentage 
 */

const percentage = (number, total) => {
    let res = (number / total) * 100;
    console.log(res.toFixed(2) + '%')
    return res.toFixed(2) + '%';
}



class UserCounts extends Component{

    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

     handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <div className="container-fluid">
            <AdminHeader/>
                <div className="row">
                    <AdminSidebar/>
                    <div className="container">
                        <div className="col-10 offset-3 mt-3" style={{top: "40px", right: "70px"}}>
                            <div className="row">
                                <div className="col-lg-4 mt-4">
                                    <div className="container">
                                        <div className="card shadow-lg text-white" style={{ background: "#1B262C"}}>
                                            <h6 className="text-center mt-3">Total Number Of Users</h6>
                                            <div className="card-body text-center">
                                                <img src={Users} alt="" id="userIcons" />
                                                <h1>{result}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-4">
                                    <div className="container">
                                        <div className="card shadow-lg text-white" style={{ background: "#0F4C75"}}>
                                            <h6 className="text-center mt-3">Total Number Of Male User</h6>
                                            <div className="card-body text-center">
                                                <img src={MaleUser} alt="" id="userIcons" />
                                                <h1>{NumberOfMale}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mt-4">
                                   <div className="container">
                                        <div className="card shadow-lg text-white" style={{ background: "#ff8080"}}>
                                            <h6 className="text-center mt-3">Total Number Of Female User</h6>
                                            <div className="card-body text-center">
                                                <img src={FemaleUser} alt="" id="userIcons"/>
                                                <h1>{NumberOfFemale}</h1>
                                            </div>
                                        </div>
                                   </div>
                                </div>
                            </div>
                            <br/>
                            <div className="col-12 shadow-lg PercentageContainer">
                                <div className="container">
                                    <h6>Total Number of Users Per Percentage</h6>
                                   <div className="row">
                                        <div className="col-12">
                                            <div className="forMalePercentage" style={{ float: 'left', position: "relative", width: percentage(NumberOfMale, result) }}>
                                                <div className={percentage(NumberOfMale, result) === "100.00%" ? "forMaleInnerValue100" : "forMaleInnerValue"}><p className="text-center text-white">{percentage(NumberOfMale, result)}</p></div>
                                            </div>
                                            <div className="forFemalePercentage" style={{ float: 'right', position: "relative", width: percentage(NumberOfFemale, result) }}>
                                                <div className={percentage(NumberOfFemale, result) === "100.00%" ? "forFemaleInnerValue100 text-center" : "forFemaleInnerValue text-center"}><p className="text-center text-white">{percentage(NumberOfFemale, result)}</p></div>
                                            </div>
                                        </div>
                                   </div>
                                </div>
                            </div>
                            <br></br>

                            <button className="btn btn-primary" data-toggle="modal" data-target="#addUser"><img src={AddUser} style={{ height: '25px', width: '25px', marginRight: '3px' }} alt=""/>Add User</button>

                            <div class="modal fade" tabindex="-1" role="dialog" id="addUser">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Modal title</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>          
                        </div>
                    </div>
                </div>
            </div>   
        )   
    }
}



export default UserCounts

