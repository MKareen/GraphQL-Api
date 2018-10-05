import { GraphQLSchema } from 'graphql';

import RootQueryType from './rootQueryType';
import mutations from './rootMutation';

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: mutations
});

export default schema;
