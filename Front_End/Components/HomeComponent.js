'use strict'

import React from 'react'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        this.setState({ username: event.target.value });
    }

    render() {
        return (
            <div className="home-container">
                <div className="input-group input-group-lg home-input">
                    <input 
                    placeholder="Twitch Username" 
                    className="form-control"
                    onChange={this.onInputChange}
                    />
                </div>
            </div>
        );
    }
}