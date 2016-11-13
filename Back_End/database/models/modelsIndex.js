'use strict'

const Channels = require('./channelModel');
const Follows = require('./followsModel');
const Videos = require('./videosModel');

// ------------ Database Associations ------------ //

// Channel => Follows Association
Channels.hasMany(Follows);
Follows.belongsTo(Channels);

Channels.hasMany(Videos);
Videos.belongsTo(Channels);

module.exports = {
    Channels,
    Follows
}