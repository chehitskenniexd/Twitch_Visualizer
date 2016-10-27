'use strict'

import React from 'react'

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onInputSubmit = this.onInputSubmit.bind(this);
    }

    onInputChange(event) {
        this.setState({ username: event.target.value });
    }

    onInputSubmit(event) {
        event.preventDefault();
        this.props.onSearchSubmit(this.state.username);
    }

    render() {
        return (
            <div className="search-container">
                <form onSubmit={this.onInputSubmit}>
                    <div className="input-group input-group-lg search-input-group">
                        <input
                            placeholder="Twitch Username"
                            className="form-control"
                            onChange={this.onInputChange}
                            />
                        <span className="input-group-btn">
                            <button className="btn btn-secondary search-submit-btn"
                                type="submit">Submit</button>
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}