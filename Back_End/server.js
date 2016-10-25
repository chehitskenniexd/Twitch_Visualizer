'use strict';

// Requires
const express = require('express');
const volleyball = require('volleyball');
const path = require('path');

// Create the server
const server = express();

// Initialize the server and other necessary information
server.use(volleyball);
server.use(express.static(__dirname));
server.use(express.static(path.resolve(__dirname + '/../public')));

server.listen(3000, () => {
    console.log('Server is listening on port', 3000);
})