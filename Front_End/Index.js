'use strict'

// This will be the entry point for the application rendering

import React from 'react';
import ReactDOM from 'react-dom';
import ReduxStore from './Redux/ReduxStore';
import { Provider } from 'react-redux';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import NavbarContainer from './Containers/NavbarContainer'
import NavbarComponent from './Components/NavbarComponent'

ReactDOM.render(
    <Provider store={ReduxStore}>
        <div className="container flexbox-container">
            <Router history={browserHistory}>
                <Route path="/" component={NavbarContainer}>
                    <IndexRoute  />
                </Route>
            </Router>
        </div>
    </Provider>,
    document.getElementById('app')
);
