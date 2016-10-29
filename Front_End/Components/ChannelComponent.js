'user strict'

import React from 'react'
import { convertDateToMDY } from '../../Utilities/utils';
import { getNumFollowsPerMonth, convertFollowsMonthObjToC3Data,
    getNumViewsPerMonth, convertViewsVideoObjToC3Data } from '../../Utilities/channelUtils';

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            followerChartData: [],
            videoViewsChartData: []
        }
    }

    render() {
        const channel = this.props.channel;
        const channelFollows = this.props.channelFollows;
        const channelVideos = this.props.channelVideos;
        const channelName = this.props.routeParams.channelName;

        if (!Object.keys(channel).length) {
            this.props.onLoadSearch(channelName);
            return <div></div>;
        }
        if (!Object.keys(channelFollows).length) {
            this.props.onLoadSearchFollows(channelName);
            return <div></div>;
        }
        if (!Object.keys(channelVideos).length) {
            this.props.onLoadSearchVideos(channelName);
            return <div></div>;
        }
        
        const followsMonthDataObj = getNumFollowsPerMonth(channelFollows);
        const followerC3Data = convertFollowsMonthObjToC3Data(followsMonthDataObj, 'Number of Follows');
        this.state.followerChartData = c3.generate({
            bindto: '#follows-chart',
            data: {
                columns: [followerC3Data]
            }
        })

        const videoViewsDataObj = getNumViewsPerMonth(channelVideos);
        const videoViewsC3Data = convertViewsVideoObjToC3Data(videoViewsDataObj, 'Number of Views');
        this.state.videoViewsChartData = c3.generate({
            bindto: '#videos-views-chart',
            data: {
                columns: [videoViewsC3Data]
            }
        })

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
                            <span className="card-title activator grey-text text-darken-4">
                            100 Most Recent Followers Per Month
                            </span>
                            <div id="follows-chart"></div>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title activator grey-text text-darken-4">Followers</span>
                            <p>{`Total Followers: ${channelFollows._total}`}</p>
                        </div>
                    </div>

                    <div className="card" id="videos-info-card">
                        <div className="card-content">
                            <span className="card-title activator grey-text text-darken-4">
                            Number of views of {`${channelVideos.videos.length}`} Most Recent Videos
                            </span>
                            <div id="videos-views-chart"></div>
                        </div>
                        <div className="card-reveal">
                            <span className="card-title activator grey-text text-darken-4">Videos</span>
                            <p>{`Total Videos: ${channelVideos._total}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}