import { GraphQLSchema } from 'graphql';

import RootQueryType from './rootQueryType';
import RootMutation from './rootMutation';

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutation
});

export default schema;
