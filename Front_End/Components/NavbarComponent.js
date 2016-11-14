'use strict'

import React from 'react';
import { Link } from 'react-router';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // this.props.children is a parameter passed in 
        // by react-router for rendering children
        return (
            <div>
                <nav className="navbar navbar-default top-navbar">
                    <div className="container">
                        <div className="navbar-header">
                            <div className="row ">
                                <div className="col sm3 m3 l3">
                                    <Link to="/" >Search Page</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {this.props.children}
            </div>
        );
    }
}