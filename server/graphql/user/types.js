import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } from 'graphql';
import { ContactType } from '../contact/types';
import { ContactService } from '../../services';
const GraphQLDate = require('graphql-date');

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: GraphQLID },
        fullName: { type: GraphQLString },
        email: { type: GraphQLString },
        createdAt: { type: GraphQLDate },
        updatedAt: { type: GraphQLDate },
        favourites: { 
            type: new  GraphQLList(ContactType),
            resolve: async (root, args) => {
                return await ContactService.getUserFavourites(root.id);
            }
        },
    })
});

export default UserType;
