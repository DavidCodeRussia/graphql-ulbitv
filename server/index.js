const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({ graphql: true }));
app.listen(3005, () => console.log('server started'));
