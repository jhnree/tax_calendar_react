import React, { Component } from 'react';
import {BrowserRouter , Route } from 'react-router-dom';

import Login from './login/login';
import Dashboard from './home/home';
import Admin from './admin/admin';
import UserCount from './admin/UserCounts';
import TaxAlert from './admin/taxAlert'
import AddUser from './admin/addUser'



class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Login}></Route>
                    <Route exact path="/Dashboard/" component={Dashboard}></Route>
                    <Route exact path="/Admin/Dashboard" component={Admin}></Route>
                    <Route exact path="/Admin/UserCounts" component={UserCount}></Route>
                    <Route exact path="/Admin/TaxAlert" component={TaxAlert}></Route>
                    <Route exact path="/Admin/AddUser" component={AddUser}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;