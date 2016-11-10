'use strict'

// Requires to setup a database
const debug = require('debug')('sql');
const chalk = require('chalk');
const Sequelize = require('sequelize');
const Promise = require('bluebird');

// Url for the db (note port 5432 is postgres default)
const name = 'TwitchViz';
const dbUrl = `postgres://localhost:5432/${name}`;

console.log(chalk.magenta(`Opening connection to dbUrl`));

const db = new Seuqlize(dbUrl, {
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
const models = require('./Models');

function sync(retries = 0, maxRetries=5){
    return db.sync({force:true})
        .then(res => console.log(`Synced with models at ${dbUrl}`))
        .catch(res => {
            console.log(`Failed to sync models at ${dbUrl}. Autocreating models`);
            return new Promise((resolve, reject) => {
                require('child_process').exec(`create db "${name}"`, resolve);
            }).then(() => sync());
        });
}

db.didSync() = sync();