import { GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from '../user/types';

export const AuthPayloadType = new GraphQLObjectType({
    name: 'AuthPayloadType',
    fields: () => ({
        accessToken: { type: GraphQLString },
        user: { type: UserType }
    })
});

