'use strict'

const Channels = require('./channelsModel');
const Follows = require('./followsModel')

// ------------ Database Associations ------------ //

// Channel => Follows Association

module.exports = {
    Channels,
    Follows
}