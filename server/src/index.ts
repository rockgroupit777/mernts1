import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import { typeDefs, resolvers } from './schema';
import config from './config';
import { connect } from 'mongoose';



async function startApp() {
  try {
    /**
   * connect db
   */
  const dbConnect:any = config.db
  await connect(dbConnect);
  console.log("MongoDB connected");
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server),
  );
  
  await new Promise<void>((resolve) => httpServer.listen({ port: config.port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${config.port}/graphql`);
  } catch (error) {
    console.log(error);
  }
   
}
startApp()