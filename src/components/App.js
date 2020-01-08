import React, { Component } from 'react';
import { BrowserRouter, Route, MemoryRouter } from 'react-router-dom'

import Login from './login/login';
import Dashboard from './home/home';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={Login}></Route>
                    <Route exact path="/Dashboard/" component={Dashboard}></Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;