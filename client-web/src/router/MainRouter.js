import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home/Home';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';

class MainRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </Switch>
        );
    }
}


export default MainRouter;
