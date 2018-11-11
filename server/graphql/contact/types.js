import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
import UserType from '../user/types';
const GraphQLDate = require('graphql-date');

export const ContactType = new GraphQLObjectType({
    name: 'ContactType',
    fields: () => ({
        id: { type: GraphQLID },
        owner: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        address: { type: GraphQLString },
        isFavourite: { type: GraphQLBoolean },
        createdAt: { type: GraphQLDate },
        updatedAt: { type: GraphQLDate }
    })
});
