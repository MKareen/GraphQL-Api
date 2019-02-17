import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } from 'graphql';
import { GraphQLDate } from '../../scalars';
import { ContactType } from '../contact/types';
import { ContactService } from '../../../services';

export const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: GraphQLID },
        fullName: { type: GraphQLString },
        email: { type: GraphQLString },
        createdAt: { type: GraphQLDate },
        updatedAt: { type: GraphQLDate },
        favourites: { 
            type: new  GraphQLList(ContactType),
            resolve: async (root) => {
                return await ContactService.getUserFavourites(root.id);
            }
        }
    })
});

