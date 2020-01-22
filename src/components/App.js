import React, { Component } from 'react';
<<<<<<< HEAD
import { BrowserRouter, Route } from 'react-router-dom'
=======
import { BrowserRouter, Route, Switch } from 'react-router-dom'
>>>>>>> b09d873332332c24c991e02519e2610ab1679f97

import {ProtectedRoute} from './protected.route';
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
<<<<<<< HEAD
                <div>
                    <Route exact path="/" component={Login}></Route>
                    <Route exact path="/Dashboard/" component={Dashboard}></Route>
                    <Route exact path="/Admin/Dashboard" component={Admin}></Route>
                    <Route exact path="/Admin/UserCounts" component={UserCount}></Route>
                    <Route exact path="/Admin/TaxAlert" component={TaxAlert}></Route>
                    <Route exact path="/Admin/AddUser" component={AddUser}></Route>
                </div>
=======
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <ProtectedRoute exact path="/Dashboard" component={Dashboard}/>
                </Switch>
>>>>>>> b09d873332332c24c991e02519e2610ab1679f97
            </BrowserRouter>
        );
    }
}

export default App;