import { GraphQLString, GraphQLID, GraphQLNonNull } from  'graphql';
import { ContactResolver } from './resolvers';
import { ContactType } from './types';

export class ContactMutation {
    static addContact() {
        return {
            type: ContactType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLString }
            },
            resolve: async (root, args, { currentUser }) => {
                if (!currentUser) {
                    return null;
                }
                return await ContactResolver.addContact(args, currentUser);
            } 
        }
    }

    static editContact() {
        return {
            type: ContactType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLString }
            },
            resolve: async (root, args, { currentUser }) => {
                if (!currentUser) {
                    return null;
                }
                return await ContactResolver.editContact(args, currentUser);
            } 
        }
    }

    static addToFavourites() {
        return {
            type: ContactType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: async (root, args) => {
                return await ContactResolver.addToFavourites(args);
            }
        }
    }

    static deleteContact() {
        return {
            type: ContactType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: async (root, args, { currentUser }) => {
                if (!currentUser) {
                    return null;
                }
                return await ContactResolver.deleteContact(args);
            }
        }
    }
}