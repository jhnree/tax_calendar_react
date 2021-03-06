import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import auth from '../auth';

import '../../css/login.css';


toast.configure({
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
});

const toastError = (message) => toast.error(message);
// const toastSuccess = (message) => toast.success(message);

const cardHeader = {
    background: '#01a8dc',
    color: 'white',
}

const cardHeaderContent = {
    position: 'absolute', 
    width: '100%', 
    left: '0px',
}

const imgWidth = {
    width: '100px',
}


class Login extends Component {

    constructor(props){
        super(props)

        this.state = {
            email:'',
            password:'',
        }
    }

    Login = (event) => {
        event.preventDefault()
       
        axios.post('/api/login', { email: this.state.email, password:this.state.password })
        .then( val => {
            switch(val.data){
                case 0:
                    toastError('All fields are required.')
                    break;
                case 1:
                    toastError("User doesn't exist.")
                    break;
                case 2:
                    toastError("Incorrect password.")
                    break;
                default:
                    axios.get(`/api/hash/${val.data.id}`)
                    .then( res => { 
                        auth.Login( () => {
                            this.upcomingDeadline()
                            localStorage.setItem('id', res.data)
                            localStorage.setItem('show', true)
                            this.props.history.push('/dashboard')
                        } )
                    })
                    .catch(console.log())
            }
        })
        .catch(console.log())
    }

    upcomingDeadline = () => {
        axios.get('/api/upcoming-deadline')
        .then( result => {
            var data = result.data
            for(var i = 0; i < data.length; i++){
                if(data[i].length > 0){
                    switch(i){
                        case 0:
                            sessionStorage.setItem(i, JSON.stringify(data[i]))
                            break;
                        case 1:
                            sessionStorage.setItem(i, JSON.stringify(data[i]))
                            break;
                        case 2:
                            sessionStorage.setItem(i, JSON.stringify(data[i]))
                            break;
                        default: return false;
                    }
                    localStorage.setItem('test', '1');
                }
            }
        })
    }

    InputChange = (event) => {
        let name = event.target.name

        switch(name){
            case 'email':
                this.setState({email:event.target.value})
                break;
            case 'password':
                this.setState({password:event.target.value})
                break;
            default: ;
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-lg-4 col-md-8 col-sm-10 col-12 mx-auto">
                        <div className="card shadow-lg">
                            <div className="card-header text-center pb-5 pt-4" style={cardHeader}>
                                <div style={cardHeaderContent}>
                                    <img alt="" src={require('../../img/taxcalendar1.png')} className="mx-auto d-block" style={imgWidth}/>
                                </div>
                            </div>
                            <div className="card-body mr-3">
                                <form onSubmit={this.Login}>
                                    <div className="input-group">
                                        <div className="input-group-append">
                                            <span className="input-group-text py-0 m-0 input-icon"><i className="admin-username-avatar"></i></span>
                                        </div>
                                        <input className="form-control font" name="email" type="text" placeholder="Email or Username" value={this.state.email} onChange={this.InputChange}/>
                                    </div>
                                    <div className="input-group mt-3">
                                        <div className="input-group-append">
                                            <span className="input-group-text py-0 m-0 input-icon"><i className="admin-password-avatar"></i></span>
                                        </div>
                                        <input className="form-control font" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.InputChange}/>
                                    </div>
                                    <div id="login-btn" className="mt-4 pl-3">
                                        <button type="submit" className="btn form-control rounded-0">LOGIN</button>
                                    </div>
                                </form>
                                <div id="forgotPassword" className="text-center mt-4">
                                    <Link to="/Dashboard">Forgot Password?</Link>
                                </div>
                                <hr className="ml-3 mt-5"/>
                                <div className="text-center">
                                    <label className="mr-1">Create an account?</label><Link to="http://192.168.2.32:8000/register">Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;