const { Prisma } = require('prisma-binding');


/**
 * Set ups for connection to a remote prisma DB via JS (Yoga)
 * @type {Prisma}
 */
const db = new Prisma({
    typeDefs : "src/generated/prisma.graphql",
    endpoint : process.env.PRISMA_ENDPOINT,
    secret : process.env.PRISMA_SECRET,
    debug : false
});

module.exports = db;