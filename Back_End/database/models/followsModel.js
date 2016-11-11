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
    },
    combined_follow: {
        type: Sequelize.STRING,
        unique: true,
    }
}, // end db creation
{
    hooks:{
        beforeCreate: setCombinedFollow
    }
}
)

// will be associated via user table
module.exports = follows;

function setCombinedFollow (follow) {
    follow.set('combined_follow', `${channel_name}${follower_name}`);
}