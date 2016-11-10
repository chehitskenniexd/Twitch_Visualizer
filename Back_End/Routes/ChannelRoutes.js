'use strict'

const channelRouter = require('express').Router();
//const db = require('../database/dbIndex');
const Promise = require('bluebird');
const http = require('http');

const Channels = require('../database/models/channelsModel');

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
            
            const options = {
                method: 'GET',
                host: 'api.twitch.tv',
                path: `kraken/channels/${req.params.name}`,
                port: 80,
                headers: {
                    'Client-ID': require('../../private/twitch.clientid').default
                }
            }
            // HTTP request to the twitch API
            Promise.method(options => {
                return new Promise((resolve, reject) => {
                    let request = http.request(options, res => {
                        console.log(res);
                    })
                })
            })

            //Channel.create(newChannel);
        })
        .then(channel => res.json(channel))
        .catch(err => console.log('Error getting user from db: ', err));
})

module.exports = channelRouter;