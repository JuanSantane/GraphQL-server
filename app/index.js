import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import models from './services/mongoose';
const App = require('./express');

const mongoose = require('mongoose');

import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

// para mezclar los archivos de las carpetas de schemas y resolvers
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './graphql/resolvers')));

const PORT = 3000;
const myGraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

App.use('/graphql', bodyParser.json(), graphqlExpress({ 
    schema: myGraphQLSchema,
    context: {
        models,
        user:{
            _id: 1, username: "PipeSanta"
        }
    }
}));
App.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

mongoose.connect('mongodb://localhost:27017/device-manager').then(
   () => {
    App.on("listening", () => {
        console.log('ok, server is running');
    });

    App.listen(PORT, () => {
    console.log("Server running...");
    });
});

