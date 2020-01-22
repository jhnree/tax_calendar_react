import React, {Component} from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './adminHeader'
import UsernameIcon from '../../img/user1.png'
import EmailIcon from '../../img/email_sign.png'
import PhoneNumber from '../../img/cellphone.png'
import Password from '../../img/password.png'
import '../../css/userCount.css'
import UserForm from '../../img/rounded-user.png'

class addUser extends Component{
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
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
                        <div className="col-10 offset-3 mt-3" style={{ top: "40px", right: "70px" }}>
                            <div className="card shadow-lg mt-5">
                                <div className="text-center">
                                    <img src={UserForm} alt="" style={{ height: '90px', width: '90px' }} />
                                    <h6><b>ADD USER</b></h6>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><img src={UsernameIcon} alt="" id="formIcon" /></span>
                                                            </div>
                                                            <input type="text" class="form-control" placeholder="Username" value={this.state.value} onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><img src={EmailIcon} alt="" id="formIcon" /></span>
                                                            </div>
                                                            <input type="email" class="form-control" placeholder="Email" value={this.state.value} onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><img src={PhoneNumber} alt="" id="formIcon" /></span>
                                                            </div>
                                                            <input type="text" class="form-control" placeholder="Mobile Number" value={this.state.value} onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text"><img src={Password} alt="" id="formIcon" /></span>
                                                            </div>
                                                            <input type="password" class="form-control" placeholder="Password" value={this.state.value} onChange={this.handleChange} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group text-center">
                                                        <button className="btn btn-md text-white" style={{ background: '#01a8dc' }}>Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default addUser