'user strict'

import React from 'react'
import { convertDateToMDY } from '../../Utilities/utils';
import {
    getNumFollowsPerMonth, getNumViewsPerMonth, createLoadingBar,
    convertFollowsMonthObjToRechartsData, convertViewsVideoObjToRechartsData
} from '../../Utilities/channelUtils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            followerChartData: [],
            videoViewsChartData: []
        }
    }

    componentWillMount() {
        if (!this.props.channel) {
            this.props.onLoadChannelInfo(this.props.routeParams.channelName);
        }
    }

    componentDidMount() {

    }

    render() {
        const channel = this.props.channel;
        const channelFollows = this.props.channelFollows;
        const channelVideos = this.props.channelVideos;
        const channelName = this.props.routeParams.channelName;

        if (!channel || !channelFollows || !channelVideos) {
            return (
                createLoadingBar()
            );
        }

        const followsMonthDataObj = getNumFollowsPerMonth(channelFollows);
        const followerRechartsData = convertFollowsMonthObjToRechartsData(followsMonthDataObj, 'Number of Follows');
        // console.log(followerRechartsData);
        const videoViewsDataObj = getNumViewsPerMonth(channelVideos);
        const videoViewsRechartsData = convertViewsVideoObjToRechartsData(videoViewsDataObj, 'Number of Views');
        // console.log(videoViewsRechartsData);

        return (
            <div className="user-container">
                <div className="row">
                    <div className="col s12 m12 lg12 user-name-card">
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
                                        <p>{`User Since: ${convertDateToMDY(channel.created_on)}`}</p>
                                    </div>
                                </div>
                                <div className="card-action" id="user-card-actions">
                                    <a href={`http://www.twitch.tv/${channel.name}`}>Twitch Link</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-information-cards">
                    <div className="row">
                        <div className="col s12 m12 l12">
                            <div className="card" id="follows-info-card">
                                <div className="card-content">
                                    <span className="card-title activator grey-text text-darken-4">
                                        {`Follows Per Month for ${channelFollows.length} Most Recent Follows`}
                                    </span>
                                    <div id="follows-chart">
                                        <LineChart width={661}
                                            height={300}
                                            data={followerRechartsData}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" name="Num Follows Per Month" dataKey="num" stroke="#6441a4" activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </div>
                                </div>
                                <div className="card-reveal">
                                    <span className="card-title activator grey-text text-darken-4">Followers</span>
                                    <p>{`Total Followers: ${channel.followers}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m12 l12">
                            <div className="card" id="videos-info-card">
                                <div className="card-content">
                                    <span className="card-title activator grey-text text-darken-4">
                                        {`Number of Views for ${channelVideos.length} Most Recent Videos`}
                                    </span>
                                    <div id="videos-views-chart">
                                        <LineChart width={661}
                                            height={300}
                                            data={videoViewsRechartsData}
                                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <XAxis dataKey="title" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" name="Video Views" dataKey="views" stroke="#6441a4" />
                                        </LineChart>
                                    </div>
                                </div>
                                <div className="card-reveal">
                                    <span className="card-title activator grey-text text-darken-4">Videos</span>
                                    <p>{`Total Videos: ${channelVideos._total}`}</p>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}