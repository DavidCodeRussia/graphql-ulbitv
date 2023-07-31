const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");

const users = [{ id: 777, username: "David", age: 21 }]; // mocks

const createUser = (input) => {
  const id = Date.now();
  return {
    id,
    ...input,
  };
};

const schema = buildSchema(`  
  type User {
    id: ID
    username: String
    age: Int
    posts: [Post]
  }
  type Post {
    id: ID
    title: String
    content: String
  }
  input UserInput {
    id: ID
    username: String!
    age: Int!
    posts: [PostInput]
  }
  input PostInput {
    id: ID
    title: String!
    content: String!
  }  
  type Query {
    getAllUsers: [User]
    getUser(id: ID): User
  }
  type Mutation {
    createUser(input: UserInput): User
  }
`);

var root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find((user) => user.id == id);
  },
  createUser: ({ input }) => {
    const user = createUser(input);
    users.push(user);
    return user;
  },
};

var app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }),
);
app.listen(5000);
console.log("Running a GraphQL API server at http://localhost:5000/graphql");
