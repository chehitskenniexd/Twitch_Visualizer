'use strict'

const Sequelize = require('sequelize');
const db = require('../DBIndex');

const follows = db.define('Follows', {
    channel_name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    followed_on: {
        type: Sequelize.DATE,
        validate: {
            notEmpty: true
        }
    },
    follower_name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    }
} // end db creation
)

// will be associated via user table
module.exports = follows;