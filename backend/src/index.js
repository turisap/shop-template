// server start up
require('dotenv').config({ path: ".env" });
const createServer = require('./CreateServer');
const db = require('./db');

const server = createServer();

// TODO Write an express middleware to handle cookies (JWT)
// TODO Write an express middleware to populate current user

const options = {
    cors : {
        credentials : true,
        origin: process.env.FRONTEND_URL
    }
};

server.start(options, deets => console.log(`Yoga server is up and running on port https://localhost:${deets.port}`));
