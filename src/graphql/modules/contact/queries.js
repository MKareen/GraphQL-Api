import { GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { ContactService } from '../../../services';
import { ContactResolver } from './resolvers';
import { ContactType } from './types';
import { ContactValidator } from './validator';

export class ContactQuery {
    static getOne() {
        return {
            type: ContactType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: async (parentValue, args, { currentUser }) => {
                ContactValidator.checkAuth(currentUser);

                return await ContactService.getById(args.id);
            }
        };
    }

    static getAllContacts() {
        return {
            type: new GraphQLList(ContactType),
            resolve: async (parentValue, args, { currentUser }) => {
                ContactValidator.checkAuth(currentUser);

                return await ContactService.getAll();
            }
        };
    }

    static searchContact() {
        return {
            type: new GraphQLList(ContactType),
            args: {
                q: { type: GraphQLString }
            },
            resolve: async (parent, args, { currentUser }) => {
                ContactValidator.checkAuth(currentUser);

                return await ContactResolver.searchContact(args, currentUser);
            }
        };
    }

    static getContactsByUser() {
        return {
            type: new GraphQLList(ContactType),
            resolve: async (parentValue, args, { currentUser }) => {
                ContactValidator.checkAuth(currentUser);

                return await ContactResolver.getByUser(currentUser);
            }
        };
    }
}
