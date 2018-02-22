import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { createApolloFetch } from "apollo-fetch";
import mongooseModels from "./services/mongoose";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SchemaLink } from "apollo-link-schema";

import path from "path";
const mongoose = require("mongoose");
const settings = require("./settings");
const App = require("./express");
const MQTT = require("./mqttClient");

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

App.use("/graphql", bodyParser.json(), graphqlExpress(graphQLOptions));
App.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" })); // if you want GraphiQL enabled

mongoose.connect("mongodb://localhost:27017/device-manager").then(() => {
  console.log("MONGO SERVER IS RUNNING...");
  App.listen(settings.port, () => {
    console.log("EXPRESS IS LISTENING..");

    MQTT.on("message", (topic, message) => {
      console.log(`SUBSCRIPTOR <<==  (${topic})`, message.toString());
      const msg = JSON.parse(message.toString());
      callGraphQLRequest(topic, msg);
    });
  });
});

function callGraphQLRequest(i, msg) {
  const fetch = createApolloFetch({
    uri: `http://localhost:${settings.port}/graphql`
  });
  fetch({ query: msg.query }).then(res => {
    MQTT.publish(msg.replyTo, JSON.stringify(res.data));
  });
}
