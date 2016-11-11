'use strict';

// Requires
const express = require('express');
const volleyball = require('volleyball');
const path = require('path');
const bodyParser = require('body-parser');

// Create the server
const server = express();

// Initialize the server and other necessary information
server.use(volleyball);
server.use(express.static(__dirname));
server.use(express.static(path.resolve(__dirname + '/../public')));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Set up the routes
server.use('/api/channels', require('./routes/channelRoutes'));

server.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

const name = 'TwitchViz';
const dbUrl = `postgres://localhost:5432/${name}`;

const db = require('./database/dbIndex');
const models = require('./database/models/modelsIndex');
server.listen(3000, () => {
  console.log('Server is listening on port', 3000);
  db.sync({ force: true })
    .then(res => console.log(`Synced with models at ${dbUrl}`))
})