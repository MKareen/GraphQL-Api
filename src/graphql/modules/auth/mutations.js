import { GraphQLString, GraphQLNonNull } from  'graphql';
import { AuthResolver } from './resolvers';
import { AuthValidator } from './validator';
import AuthPayloadType from './types';

export class AuthMutation {
    static signup() {
        return {
            type: AuthPayloadType,
            args: {
                fullName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (root, args) => {
                AuthValidator.signup(args);

                return await AuthResolver.signup(args);
            } 
        };
    }

    static login() {
        return {
            type: AuthPayloadType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (root, args) => {
                AuthValidator.login(args);

                return await AuthResolver.login(args);
            } 
        };
    }
}
