'use strict'

// Requires to setup a database
const debug = require('debug')('sql');
const chalk = require('chalk');
const Sequelize = require('sequelize');
const Promise = require('bluebird');

// Url for the db (note port 5432 is postgres default)
const name = 'TwitchViz';
const dbUrl = `postgres://localhost:5432/${name}`;

console.log(chalk.magenta(`Opening connection to ${dbUrl}`));

const db = new Sequelize(dbUrl, {
    logging: debug,
    native: true,
    define:{
        underscored: true, // snake_case vs camelCase
        freezeTableName: true, // do not change table names from the one specified
        timestamps: true,
    }
});

module.exports = db;

// sync with models and create if necessary

function sync(retries = 0, maxRetries=5){
    return db.sync({force:true})
        .then(res => console.log(`Synced with models at ${dbUrl}`))
}

db.didSync = sync();