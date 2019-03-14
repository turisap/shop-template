require('dotenv').config({path : '.env'});
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const createServer = require('./createServer');
const DB = require('./db');

const server = createServer();


/**
 *  Use express middleware to handle cookies (JWT)
 */
server.express.use(cookieParser());



/**
 * Use express middleware to populate current user
 */
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        // decode user id from jwt token and place it in each request
        // you can put any necessary values to jwt tokens and subsequently in all requests
        req.userId = jwt.verify(token, process.env.APP_SECRET).userId;
    }
    next();
});



server.start({
    cors : {
        credentials : true,
        origin : process.env.FRONTEND_URL
    }
}, deets => {
    console.log(`Server is now running on port http://localhost${deets.port}`)
});