const { GraphQLServer } = require("graphql-yoga");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");

/**
 * Create a GraphQL Yoga server
 */

function createServer() {
    return new GraphQLServer({
        typeDefs : "src/schema.graphql",
        resolvers : {
            Mutation,
            Query
        },
        resolverValidationOptions : {
            requireResolversForResolveType : false
        },
        context : request => ({...request, db})
    });
}

module.exports = createServer;

