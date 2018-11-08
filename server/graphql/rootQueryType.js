import { GraphQLObjectType } from 'graphql';
import { UserQuery } from './user/queries';

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: UserQuery.getOne(),
        currentUser: UserQuery.getCurrentUser(),
        usersList: UserQuery.getAll()
    })
});

export default RootQueryType;

