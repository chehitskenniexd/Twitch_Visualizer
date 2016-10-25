'use strict';

// Requires
const express = require('express');
const volleyball = require('volleyball');

// Create the server
const server = express();

// Initialize the server and other necessary information
server.use(volleyball);
server.use(express.static(__dirname));

server.get('/', (req, res) => {
    res.json('hello');
})

server.listen(3000, () => {
    console.log('Server is listening on port', 3000);
})