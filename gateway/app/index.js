'use strict'
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import path from "path";
const util = require('util')

// to create the subscription conection
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

const App = require("./express");
const MQTT = require("./mqttClient");
const settings = require('./settings');

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, "./graphql/schemas")));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, "./graphql/resolvers")));

const ws = createServer(App);

App.use((request, response, next) => {  

  next();
  });

App.use("/graphql", bodyParser.json(), graphqlExpress(req => 
    ({
      schema: makeExecutableSchema({ typeDefs, resolvers }),
      context: {
        mqtt: MQTT.mqttClient,
        rqst: req.body,
        date: Date.now()
      }
    })
  ));
App.get("/graphiql", graphiqlExpress({ 
    endpointURL: "/graphql",
    subscriptionsEndpoint: `ws://localhost:${settings.wsPort}/subscriptions`
  })); // if you want GraphiQL enabled

App.listen(settings.port, () => {
    console.log(`EXPRESS IS LISTENING PORT ${settings.port}`);
    ws.listen(settings.wsPort, () => {
        console.log(`GraphQL Subscriptions Server running on http://localhost:${settings.wsPort}`);  
        new SubscriptionServer({
          execute,
          subscribe,
          schema :  makeExecutableSchema({ typeDefs, resolvers })
        }, {
          server: ws,
          path: '/subscriptions',
        });
      });

});




