import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import { createServer } from 'http';

import { Schema } from './data/schema';
import { Mocks } from './data/mocks';

const GRAPHQL_PORT = 8008;

const app = express();

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
});

addMockFunctionsToSchema({
  schema: executableSchema,
  mocks: Mocks,
  preserveResolvers: true,
});

// `context` must be an object and can't be undefined when using connectors
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
  context: {}, // empty objext first
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

const graphqlServer = createServer(app);

graphqlServer.listen(GRAPHQL_PORT, () => console.log(`Server is running on http://localhost:${GRAPHQL_PORT}/graphql`));
