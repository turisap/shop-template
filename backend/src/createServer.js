const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const DB = require('./db');

function createServer(){
    return new GraphQLServer({
        typeDefs : 'src/schema.graphql',
        resolvers : {
            Mutation,
            Query
        },
        resolverValidationOptions : {
            requireResolversForResolveType: false
        },
        context : req => ({...req, DB})
    })
}

module.exports = createServer;