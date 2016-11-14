'use strict'

const channelRouter = require('express').Router();
const Promise = require('bluebird');
const http = require('http');
//const axiosUtils = require('../../Utilities/axiosUtils');
const axios = require('axios');
const Channels = require('../database/models/channelModel');
const Follows = require('../database/models/followsModel');
const Videos = require('../database/models/videosModel');
const clientId = require('../../private/twitch.clientid').clientId;
const Chalk = require('chalk');

channelRouter.get('/', (req, res, next) => {
    Channels.findAll({
        include: [{ all: true }]
    })
        .then(channels => res.json(channels))
        .catch(err => console.log('Error getting all channels from db: ', err));
})

function getAllFollowersForUser(url) {
    let allFollowers = [];
    return axios.get(url, {
        headers: {
            [`Client-ID`]: clientId,
            Accept: `application/vnd.twitchtv.v3+json`,
            [`x-api-version`]: 3
        }
    })
        .then(res => {
            return [...res.data.follows];
        })
        .catch(err => console.log('Error getting all followers from api: ', err));
}

function getAllVideosForUser(url) {
    let allVideos = [];
    return axios.get(url, {
        headers: {
            [`Client-ID`]: clientId,
            Accept: `application/vnd.twitchtv.v3+json`,
            [`x-api-version`]: 3
        }
    })
        .then(res => {
            return [...res.data.videos];
        })
        .catch(err => console.log('Error getting all videos from api: ', err));
}

channelRouter.get('/:name', (req, res, next) => {
    console.log('Getting user data from DB');
    let response = {};
    Channels.findOne({
        where: { name: req.params.name },
        include: [{ all: true }]
    })
        .then(channel => {
            if (channel) { return Object.assign(response, {}, { channel }); }
            console.log('No DB data, Grabbing user data from the API');
            // HTTP request to the twitch api
            let url = `https://api.twitch.tv/kraken/channels/${req.params.name}`;

            return axios.get(url, {
                headers: {
                    [`Client-ID`]: clientId,
                    Accept: `application/vnd.twitchtv.v3+json`,
                    [`x-api-version`]: 3
                }
            })
                .then(res => {
                    // deletes prop from res.data so db can add "created_at" field
                    let created_on = res.data.created_at;
                    delete res.data.created_at;
                    const channel = Object.assign({}, res.data, { created_on });
                    return Object.assign(response, {}, { channel });
                })
                .then(channel => {
                    // if this is the first time, the followers have not been added yet
                    let url = `https://api.twitch.tv/kraken/channels/${req.params.name}/follows?limit=100`;
                    return getAllFollowersForUser(url)
                        .then(data => {
                            const follows = data.map((follow, index) => {
                                const info = {
                                    channel_name: req.params.name,
                                    followed_on: follow.created_at,
                                    follower_name: follow.user.name
                                }
                                return info;
                            })
                            return Object.assign(response, {}, { follows });
                        })
                        .then(channel => {
                            // if this is the first time, the videos have not been added yet
                            let url = `https://api.twitch.tv/kraken/channels/${req.params.name}/videos?limit=100`;
                            return getAllVideosForUser(url)
                                .then(data => {
                                    const videos = data.map((video, index) => {
                                        return {
                                            title: video.title,
                                            views: video.views,
                                            created_on: video.created_at,
                                            game: video.game,
                                            length: video.length,
                                            url: video.url
                                        }
                                    })
                                    return Object.assign(response, {}, { videos });
                                })
                        })
                        .then(infoObj => {
                            Channels.create(response.channel)
                                .then(channel => {
                                    const followsCreate = response.follows.map(follow => {
                                        return Follows.create(follow)
                                            .then(follow => follow.setChannel(channel));
                                    })
                                    const videosCreate = response.videos.map(video => {
                                        return Videos.create(video)
                                            .then(video => video.setChannel(channel));
                                    })
                                    Promise.all([...followsCreate, ...videosCreate])
                                        .then(res => res);
                                })
                        })
                        .catch(err => console.log('Error getting follows from api: ', err));
                })
                .catch(err => console.log('Error getting user from api: ', err));
        })
        .then(() => res.json(response))
        .catch(err => console.log('Error getting user => ', err));
})

module.exports = channelRouter;