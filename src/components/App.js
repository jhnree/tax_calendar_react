import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import {ProtectedRoute} from './protected.route';
import Login from './login/login';
import Dashboard from './home/home';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Login}/>
                    <ProtectedRoute exact path="/Dashboard" component={Dashboard}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;