import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } from 'graphql';
import { GraphQLObjectId, GraphQLDate } from '../../scalars';

export const ContactType = new GraphQLObjectType({
    name: 'ContactType',
    fields: () => ({
        id: { type: GraphQLID },
        owner: { type: GraphQLObjectId },
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
