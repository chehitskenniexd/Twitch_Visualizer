'use strict'

const Channels = require('./channelModel');
const Follows = require('./followsModel')

// ------------ Database Associations ------------ //

// Channel => Follows Association
Channels.hasMany(Follows);
Follows.belongsTo(Channels);

module.exports = {
    Channels,
    Follows
}