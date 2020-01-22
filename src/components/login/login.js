import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import auth from '../auth';

import '../../css/login.css';


toast.configure({
    position: "top-left",
    autoClose: 15000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
});

const toastError = (message) => toast.error(message);
const toastSuccess = (message) => toast.success(message);

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
<<<<<<< HEAD
=======

    constructor(props){
        super(props)

        this.state = {
            email:'',
            password:'',
        }
    }

    Login = (event) => {
        event.preventDefault()
        const link = 'api/hash/439'
        fetch(link, {
            method: 'get',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
                },
        }).then(response => response.json()
        ).then((json) => {
            console.log(json)
        }).catch(console.log())
        // const ApiLink = 'api/login'
        // fetch(ApiLink, {
        //     method:'POST',
        //     headers: {
        //         'Content-Type':'application/json',
        //         'Accept':'application/json'
        //         },
        //     body:JSON.stringify({
        //         email:this.state.email,
        //         password:this.state.password,
        //     })
        // })
        // .then(response => response.json())
        // .then(json => {
        //         if(json === 0){
        //             toastError('All fields are required!')
        //         }
        //         else if(json === 1){
        //             toastError("User doesn't exist!")
        //         }
        //         else if(json === 2){
        //             toastError("Incorrect password!")
        //         }
        //         else{
        //             toastSuccess("Successfully Login")

        //             auth.Login(() => {
        //                 localStorage.setItem("id", json.id)
        //                 this.props.history.push('/dashboard'); 
        //             })
        //         }
        //     }
        // )
        // .catch(console.log())
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

>>>>>>> b09d873332332c24c991e02519e2610ab1679f97
    render() {
        return (
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="col-lg-4 col-12 mx-auto">
                        <div className="card shadow-lg">
                            <div className="card-header text-center pb-5 pt-4" style={cardHeader}>
                                <div style={cardHeaderContent}>
<<<<<<< HEAD
                                    <img src={require('../../img/taxcalendar1.png')} alt="" className="mx-auto d-block" style={imgWidth}/>
=======
                                    <img alt="" src={require('../../img/taxcalendar1.png')} className="mx-auto d-block" style={imgWidth}/>
>>>>>>> b09d873332332c24c991e02519e2610ab1679f97
                                </div>
                            </div>
                            <div className="card-body mr-3">
                                <form onSubmit={this.Login}>
                                    <div className="input-group">
                                        <div className="input-group-append">
                                            <span className="input-group-text py-0 m-0 input-icon"><i className="admin-username-avatar"></i></span>
                                        </div>
<<<<<<< HEAD
                                        <input className="form-control font" name="email" type="text" placeholder="Email or Username"/>
                                        
=======
                                        <input className="form-control font" name="email" type="text" placeholder="Email or Username" value={this.state.email} onChange={this.InputChange}/>
>>>>>>> b09d873332332c24c991e02519e2610ab1679f97
                                    </div>
                                    <div className="input-group mt-3">
                                        <div className="input-group-append">
                                            <span className="input-group-text py-0 m-0 input-icon"><i className="admin-password-avatar"></i></span>
                                        </div>
<<<<<<< HEAD
                                        <input className="form-control font" name="password" type="password" placeholder="Password" />
                                       
=======
                                        <input className="form-control font" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.InputChange}/>
>>>>>>> b09d873332332c24c991e02519e2610ab1679f97
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