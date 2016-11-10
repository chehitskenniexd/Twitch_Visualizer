'use strict'

const Sequelize = require('sequelize');
const db = require('../DBIndex');

const channels = db.define('Channels', {
    name: {
        type: Sequelize.STRING,
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
    created_at: {
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