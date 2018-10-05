import { GraphQLString, GraphQLID, GraphQLNonNull } from  'graphql';
import { AuthResolver } from './resolvers';
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
            resolve: async (parent, args) => {
                return await AuthResolver.signup(args);
            } 
        }
    }

    static login() {
        return {
            type: AuthPayloadType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, fields) => {
                return await AuthResolver.login(fields);
            } 
        }
    }
}