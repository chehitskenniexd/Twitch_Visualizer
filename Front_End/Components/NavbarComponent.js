'use strict'

import React from 'react';

export default class Navbar extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        console.log('hi');
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                    </div>
                </div>
            </nav>
        );
    }
}