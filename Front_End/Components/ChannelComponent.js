'user strict'

import React from 'react'
import { convertDateToMDY } from '../../Utilities/utils';
import {
    getNumFollowsPerMonth, convertFollowsMonthObjToC3Data,
    getNumViewsPerMonth, convertViewsVideoObjToC3Data
} from '../../Utilities/channelUtils';

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

    render() {
        const channel = this.props.channel;
        const channelFollows = this.props.channelFollows;
        const channelVideos = this.props.channelVideos;
        const channelName = this.props.routeParams.channelName;

        if (!channel) {
            console.log('hello from no channel!');
            return (
                <div className="row">
                    <div className="col s12 m12 lg12">
                        <div className="card">
                            <div className="loading-bar">
                                <div className="preloader-wrapper big active">
                                    <div className="spinner-layer spinner-blue">
                                        <div className="circle-clipper left">
                                            <div className="circle"></div>
                                        </div><div className="gap-patch">
                                            <div className="circle"></div>
                                        </div><div className="circle-clipper right">
                                            <div className="circle"></div>
                                        </div>
                                    </div>

                                    <div className="spinner-layer spinner-red">
                                        <div className="circle-clipper left">
                                            <div className="circle"></div>
                                        </div><div className="gap-patch">
                                            <div className="circle"></div>
                                        </div><div className="circle-clipper right">
                                            <div className="circle"></div>
                                        </div>
                                    </div>

                                    <div className="spinner-layer spinner-yellow">
                                        <div className="circle-clipper left">
                                            <div className="circle"></div>
                                        </div><div className="gap-patch">
                                            <div className="circle"></div>
                                        </div><div className="circle-clipper right">
                                            <div className="circle"></div>
                                        </div>
                                    </div>

                                    <div className="spinner-layer spinner-green">
                                        <div className="circle-clipper left">
                                            <div className="circle"></div>
                                        </div><div className="gap-patch">
                                            <div className="circle"></div>
                                        </div><div className="circle-clipper right">
                                            <div className="circle"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        const followsMonthDataObj = getNumFollowsPerMonth(channelFollows);
        const followerC3Data = convertFollowsMonthObjToC3Data(followsMonthDataObj, 'Number of Follows');
        this.state.followerChartData = c3.generate({
            bindto: '#follows-chart',
            data: {
                columns: [followerC3Data]
            }
        })

        // const videoViewsDataObj = getNumViewsPerMonth(channelVideos);
        // const videoViewsC3Data = convertViewsVideoObjToC3Data(videoViewsDataObj, 'Number of Views');
        // this.state.videoViewsChartData = c3.generate({
        //     bindto: '#videos-views-chart',
        //     data: {
        //         columns: [videoViewsC3Data]
        //     }
        // })

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
                                        <p>{`User Since: ${convertDateToMDY(channel.created_at)}`}</p>
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
                        <div className="col s12 m6 l6">
                            <div className="card" id="follows-info-card">
                                <div className="card-content">
                                    <span className="card-title activator grey-text text-darken-4">
                                        Follows Per Month for {`${channelFollows.follows.length}`}Most Recent Follows
                            </span>
                                    <div id="follows-chart"></div>
                                </div>
                                <div className="card-reveal">
                                    <span className="card-title activator grey-text text-darken-4">Followers</span>
                                    <p>{`Total Followers: ${channelFollows._total}`}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m6 l6">
                            <div className="card" id="videos-info-card">
                                <div className="card-content">
                                    <span className="card-title activator grey-text text-darken-4">
                                        Number of Views for {`${channelVideos.videos.length}`}Most Recent Videos
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
                </div>
            </div>
        );
    }
}