import { GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import { UserService } from '../../../services';
import { UserType } from './types';

export class UserQuery {
    static getOne() {
        return {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: async (root, args) => {
                return await UserService.getById(args.id);
            }
        };
    }

    static getAll() {
        return {
            type: new GraphQLList(UserType),
            resolve: async () => {
                return await UserService.getAll();
            }
        };
    }

    static getCurrentUser() {
        return {
            type: UserType,
            resolve: async (root, args, { currentUser }) => {
                if (!currentUser) {
                    return null;
                }

                return await UserService.getByEmail(currentUser.email);
            }
        };
    }
}
