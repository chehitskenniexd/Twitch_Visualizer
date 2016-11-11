'use strict'

const channelRouter = require('express').Router();
const Promise = require('bluebird');
const http = require('http');
//const axiosUtils = require('../../Utilities/axiosUtils');
const axios = require('axios');
const Channels = require('../database/models/channelsModel');
const Follows = require('../database/models/followsModel');
const clientId = require('../../private/twitch.clientid').clientId;

channelRouter.get('/', (req, res, next) => {
    Channels.findAll({
        include: [{ all: true }]
    })
        .then(channels => res.json(channels))
        .catch(err => console.log('Error getting all channels from db: ', err));
})

channelRouter.get('/:name', (req, res, next) => {
    console.log('Getting user data from DB');
    Channels.findOne({
        where: { name: req.params.name }
    })
        .then(channel => {
            let response = {};
            if (channel) { return Object.assign({}, response, { channel }); }
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
                    return Channels.create(Object.assign({}, res.data, { created_on }))
                        .then(channel => Object.assign({}, response, { channel }))
                })
                .then(channel => {
                    // if this is the first time, the followers have not been added yet
                    let url = `https://api.twitch.tv/kraken/channels/${req.params.name}/follows?limit=100`;
                    return axios.get(url, {
                        headers: {
                            [`Client-ID`]: clientId,
                            Accept: `application/vnd.twitchtv.v3+json`,
                            [`x-api-version`]: 3
                        }
                    })
                        .then(res => {
                            const data = res.data.follows;
                            const allCreates = data.map((follow, index) => {
                                console.log(index, follow);
                                const creator = {
                                    channel_name: req.params.name,
                                    followed_on: follow.created_at,
                                    follower_name: follow.user.name
                                }
                                return Follows.create(creator);
                            })
                            Promise.all(allCreates)
                                .then(resolution => resolution)
                                .catch(err => console.log('Error getting follows from api', err));
                        })
                        .catch(err => console.log('Error getting follows from api: ', err));
                })
                .catch(err => console.log('Error getting user from api: ', err));
        })
        .then(channel => res.json(channel))
        .catch(err => console.log('Error getting user => ', err));
})

module.exports = channelRouter;