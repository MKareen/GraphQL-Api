import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { UserQuery } from './user/queries';

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: UserQuery.getOne(),
        usersList: UserQuery.getAll()
    })
});

export default RootQueryType;

