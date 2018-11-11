import { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { ContactService } from '../../services';
import { ContactResolver } from './resolvers';
import { ContactType } from './types';

export class ContactQuery {
    static getOne() {
        return {
            type: ContactType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: async (parentValue, args, { currentUser }) => {
                console.log(args.id);
                if (!currentUser) {
                    return null;
                }
                return await ContactService.getById(args.id);
            }
        }
    }

    static getAllContacts() {
        return {
            type: new GraphQLList(ContactType),
            resolve: async (parentValue, args, { currentUser }) => {
                if (!currentUser) {
                    return null;
                }
                return await ContactService.getAll();
            }
        }
    }

    static searchContact() {
        return {
            type: new GraphQLList(ContactType),
            args: {
                q: { type: GraphQLString }
            },
            resolve: async (parent, args, { currentUser }) => {
                if (!currentUser) {
                    return null;
                }
                return await ContactResolver.searchContact(args, currentUser);
            }
        }
    }

    static getContactsByUser() {
        return {
            type: new GraphQLList(ContactType),
            resolve: async (parentValue, args, { currentUser }) => {
                if (!currentUser) {
                    return null;
                }

                return await ContactResolver.getByUser(currentUser);
            }
        }
    }
}
