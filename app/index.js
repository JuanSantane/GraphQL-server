import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { createApolloFetch } from "apollo-fetch";
import mongooseModels from "./services/mongoose";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import path from "path";
const mongoose = require("mongoose");
const settings = require("./settings");
const App = require("./express");

// RXJS
const RX = require("rxjs");

// para mezclar los archivos de las carpetas de schemas y resolvers
const typeDefs = mergeTypes( fileLoader(path.join(__dirname, "./graphql/schemas")));
const resolvers = mergeResolvers( fileLoader(path.join(__dirname, "./graphql/resolvers")) );

const graphQLOptions = {
  schema: makeExecutableSchema({ typeDefs, resolvers }),
  context: {
    models: mongooseModels,
    user: { _id: 1, username: "PipeSanta" }
  }
}

App.use("/graphql",bodyParser.json(), graphqlExpress(graphQLOptions));
App.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" })); // if you want GraphiQL enabled

mongoose.connect("mongodb://localhost:27017/device-manager").then(() => {
  console.log("MONGO SERVER IS RUNNING...");
  App.listen(settings.port, () => {
    console.log("EXPRESS IS LISTENING..");
    
    RX.Observable.interval(2000).subscribe(i => {     
      const query = "query { getAllUsers { _id, username, email } }"; 
      callGraphQLRequest(i, query);
    });
  });
});

function callGraphQLRequest(i, queryToDo){
  const fetch = createApolloFetch({ uri: `http://localhost:${settings.port}/graphql` });
  fetch({ query: queryToDo })
  .then(res => console.log(i + " ==> ",  res.data));
}
