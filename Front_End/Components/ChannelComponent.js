'user strict'

import React from 'react'
import { convertDateToMDY } from '../../utils';

export default class User extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const channel = this.props.channel;
        const follows = this.props.channelFollows;
        const videos = this.props.channelVideos;            
        const channelName = this.props.routeParams.channelName;

        if (!Object.keys(channel).length) {
            this.props.onLoadSearch(channelName);
            return <div></div>;
        }
        if (!Object.keys(follows).length) {
            this.props.onLoadSearchFollows(channelName);
            return <div></div>;
        }
        if (!Object.keys(videos).length) {
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
                    <div className="card" id="follows-info-card">
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">Followers</span>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title activator grey-text text-darken-4">Followers</span>
                            <p>{`Total Followers: ${follows._total}`}</p>
                        </div>
                    </div>

                    <div className="card" id="videos-info-card">
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">Videos</span>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title activator grey-text text-darken-4">Videos</span>
                            <p>{`Total Videos: ${videos._total}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}