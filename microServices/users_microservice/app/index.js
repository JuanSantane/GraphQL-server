import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { createApolloFetch } from "apollo-fetch";
import mongooseModels from "./services/mongoose";

import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import path from "path";

// to create the subscription conection
import { execute, subscribe } from "graphql";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";

import { ApolloLink } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";

import gql from 'graphql-tag';

const mongoose = require("mongoose");
const MQTT = require("./mqttClient");
const settings = require("./settings");

// para mezclar los archivos de las carpetas de schemas y resolvers
const typeDefs = mergeTypes(
  fileLoader(path.join(__dirname, "./graphql/schemas"))
);
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./graphql/resolvers"))
);

const graphQLOptions = {
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  context: {
    models: mongooseModels,
    user: { _id: 1, username: "PipeSanta" },
    token: "dfgtsdfgsd"
  }
};

const client = new ApolloClient({
  ssr: true,
  cache: new InMemoryCache(),
  link: new SchemaLink( makeExecutableSchema({ typeDefs, resolvers }) )
});

MQTT.mqttClient.on("message", (topic, msg) => {
  const replyTo ="getAllUsersResp"
  console.log("NEW REQUEST TO THE MICROSERVICE: ", msg.toString());
  const query = JSON.parse(msg.toString()).body;
  console.log("QUERY ==> ", query);
  const gqlQuery = gql`${query}`;   
  client.query({ query: gqlQuery})
    .then(res => console.log(res) )
    .catch(err => console.log(err) );
});


