'use strict'

const Sequelize = require('sequelize');
const db = require('../DBIndex');
const Follows = require('./followsModel');

const channels = db.define('channel', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    _id: { // this id is the TWITCH ASSIGNED ID
        type: Sequelize.INTEGER,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    display_name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    created_on: {
        type: Sequelize.DATE
    },
    logo: {
        type: Sequelize.TEXT,
        defaultValue: null
    },
    views: Sequelize.INTEGER,
    followers: Sequelize.INTEGER,
    url: {
        type: Sequelize.TEXT,
        validate: {
            notEmpty: true
        }
    },
    partner: Sequelize.BOOLEAN
} // end channel table creation
)

//export the model
module.exports = channels;