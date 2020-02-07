import React, { Component } from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login/login';
import Dashboard from './home/home';
import Admin from './admin/admin';
import UserCount from './admin/UserCounts';
import TaxAlert from './admin/taxAlert'
import AddUser from './admin/addUser'
import EventDashboard from './admin/eventDashboard'
import { ProtectedRoute } from './protected.route'


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/" component={Login}></Route>
                        <ProtectedRoute exact path="/Dashboard/" component={Dashboard}></ProtectedRoute>
                        <Route exact path="/Admin/Dashboard" component={Admin}></Route>
                        <Route exact path="/Admin/UserCounts" component={UserCount}></Route>
                        <Route exact path="/Admin/TaxAlert" component={TaxAlert}></Route>
                        <Route exact path="/Admin/AddUser" component={AddUser}></Route>
                        <Route exact path="/Admin/EventDashboard" component={EventDashboard}></Route>
                        <Route path="*" component={ () => "Error 404: Page Not Found" }></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;