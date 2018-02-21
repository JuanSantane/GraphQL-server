import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
const { createApolloFetch } = require("apollo-fetch");
import models from "./services/mongoose";
const App = require("./express");

const mongoose = require("mongoose");
const settings = require("./settings");

import path from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
// RXJS
const RX = require("rxjs");

// para mezclar los archivos de las carpetas de schemas y resolvers
const typeDefs = mergeTypes(
  fileLoader(path.join(__dirname, "./graphql/schemas"))
);
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, "./graphql/resolvers"))
);

const myGraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

App.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema: myGraphQLSchema,
    context: {
      models,
      user: {
        _id: 1,
        username: "PipeSanta"
      }
    }
  })
);
App.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" })); // if you want GraphiQL enabled

mongoose.connect("mongodb://localhost:27017/device-manager").then(() => {
  App.on("listening", () => {
    console.log("ok, server is running");
    const resultQuery = console.log();
  });

  App.listen(settings.port, () => {
    console.log("Server running...");

    const fetch = createApolloFetch({uri: "http://localhost:3000/graphql"});
    fetch({
        query: "query { getAllUsers { _id, username,email } }"
      }).then(res => console.log(res.data));
  });
});
