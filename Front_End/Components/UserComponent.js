'user strict'

import React from 'react'
import { convertDateToMDY } from '../../utils';

export default class User extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        const currentUser = this.props.currentUser.user;
        if (!Object.keys(this.props.currentUser).length) {
            this.props.onLoadSearch(this.props.routeParams.userName);
            return <div></div>;
        }

        return (
            <div className="user-container">
                <div className="col s12 m7 lg4 user-name-card">
                    <div className="card horizontal">
                        <div className="card-image">
                            <img src={currentUser.logo}></img>
                            <span></span>
                        </div>
                        <div className="card-stacked">
                            <div className="card-content" id="user-card-content">
                                <h4>{`${currentUser.display_name}`}</h4>
                                <div className="user-card-info-content">
                                    <p>{`Follower Count: ${currentUser.followers}`}</p>
                                    <p>{`View Count: ${currentUser.views}`}</p>
                                    <p>{`Partner Status: ${currentUser.partner ? 'Yes' : 'No'}`}</p>
                                    <p>{`Game: ${currentUser.game}`}</p>
                                    <p>{`User Since: ${convertDateToMDY(currentUser.created_at)}`}</p>
                                </div>
                            </div>
                            <div className="card-action" id="user-card-actions">
                                <a href={`http://www.twitch.tv/${currentUser.name}`}>Twitch Link</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-information-cards">
                    
                </div>
            </div>
        );
    }
}