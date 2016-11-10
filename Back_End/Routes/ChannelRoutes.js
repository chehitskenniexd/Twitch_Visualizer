'use strict'

const channelRouter = require('express').Router();
const Promise = require('bluebird');
const http = require('http');
//const axiosUtils = require('../../Utilities/axiosUtils');
const axios = require('axios');
const Channels = require('../database/models/channelsModel');
const clientId = require('../../private/twitch.clientid').clientId;

channelRouter.get('/', (req, res, next) => {
    Channels.findAll({
        include: [{ all: true }]
    })
        .then(channels => res.json(channels))
        .catch(err => console.log('Error getting all channels from db: ', err));
})

channelRouter.get('/:name', (req, res, next) => {
    console.log('hello');
    Channels.findOne({
        where: { name: req.params.name }
    })
        .then(channel => {
            if (channel) { return channel; }
            console.log('hello2');
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
                    return Channels.create(Object.assign({}, res.data, {created: new Date().now}))
                        .then(channel => channel)
                })
                .catch(err => console.log('Error getting user from api: ', err));

        })
        .then(channel => res.json(channel))
        .catch(err => console.log('Error getting user from db: ', err));
})

module.exports = channelRouter;