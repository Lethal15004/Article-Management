import express, { Express } from "express";
import dotenv from 'dotenv';//Nhúng dotenv từ module dotenv
dotenv.config();//Thêm config cho dotenv
import { ApolloServer } from "apollo-server-express"; //Nhúng graphql server

//Import connect database
import connectDataBase from "./config/database";

//Import typeDefs for GraphQL
import typeDefs from "./typeDefs";

//import resolvers for GraphQL
import resolvers from "./resolvers";

const startServer = async () => {
  const app: Express = express();
  const port: number = 3000;

  connectDataBase();

  const apolloServer= new ApolloServer({
    typeDefs,
    resolvers,
  })
  await apolloServer.start();

  apolloServer.applyMiddleware({
    app:app,
    path:"/graphql" 
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

startServer();








