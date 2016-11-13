'use strict'

const Sequelize = require('sequelize');
const db = require('../DBIndex');

const videos = db.define('Videos', {
    title: {
        type: Sequelize.STRING
    },
    views: {
        type: Sequelize.INTEGER,
        validate: {
            notEmpty: true
        }
    },
    created_on: {
        type: Sequelize.DATE,
        validate: {
            notEmpty: true
        }
    },
    game: {
        type: Sequelize.STRING
    },
    length: {
        type: Sequelize.INTEGER,
        validate:{
            notNull: true
        }
    }
} // end db creation
)

// will be associated via user table
module.exports = videos;