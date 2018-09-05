import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { createConnection } from 'typeorm';
import Post from './entity/Post';
import { allPosts, readPosts, tagsOfPost } from './postManager';

createConnection().then(async () => {
  const app = express();
  app.use(cors());
  app.use((_, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return next();
  });
  app.get('/', (req, res) => res.send('Hello World!'));
  app.get('/readPosts', readPosts);
  const typeDefs = gql`
  type Tag {
    id: ID!
    name: String!
  }
  type Post {
    id: ID!
    name: String!
    tags: [Tag]
  }
  type Query {
    allPosts: [Post]
  }
  `;
  const resolvers = {
    Post: {
      tags(post: Post) {
        return tagsOfPost(post.id);
      },
    },
    Query: {
      allPosts,
    },
  };
  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
  );
}).catch((error) => console.log(error));
