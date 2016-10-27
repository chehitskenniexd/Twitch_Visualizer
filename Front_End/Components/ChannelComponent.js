'user strict'

import React from 'react'
import { convertDateToMDY } from '../../utils';

export default class User extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const channel = this.props.channel;
        if (!Object.keys(this.props.channel).length) {
            const channelName = this.props.routeParams.channelName;
            this.props.onLoadSearch(channelName);
            this.props.onLoadSearchFollows(channelName);
            this.props.onLoadSearchVideos(channelName);
            return <div></div>;
        }

        return (
            <div className="user-container">
                <div className="col s12 m7 lg4 user-name-card">
                    <div className="card horizontal">
                        <div className="card-image">
                            <img src={channel.logo}></img>
                            <span></span>
                        </div>
                        <div className="card-stacked">
                            <div className="card-content" id="user-card-content">
                                <h4>{`${channel.display_name}`}</h4>
                                <div className="user-card-info-content">
                                    <p>{`Follower Count: ${channel.followers}`}</p>
                                    <p>{`View Count: ${channel.views}`}</p>
                                    <p>{`Partner Status: ${channel.partner ? 'Yes' : 'No'}`}</p>
                                    <p>{`Game: ${channel.game}`}</p>
                                    <p>{`User Since: ${convertDateToMDY(channel.created_at)}`}</p>
                                </div>
                            </div>
                            <div className="card-action" id="user-card-actions">
                                <a href={`http://www.twitch.tv/${channel.name}`}>Twitch Link</a>
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