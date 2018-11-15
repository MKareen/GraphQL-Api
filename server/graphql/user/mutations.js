import { GraphQLString, GraphQLNonNull } from  'graphql';
import { UserResolver } from './resolvers';
import UserType from './types';
import { UserValidator } from './validator';

export class UserMutation {
    static editUser() {
        return {
            type: UserType,
            args: {
                fullName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async (root, args, { currentUser }) => {
                UserValidator.edit(args, currentUser);

                return await UserResolver.edit(args, currentUser);
            }
        };
    }
}
