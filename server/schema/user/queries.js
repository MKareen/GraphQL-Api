import { GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import { UserService } from '../../services';
import UserType from './types';

export class UserQuery {
    static getOne() {
        return {
            type: UserType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: async (parentValue, args) => {
                return await UserService.getById(args._id);
            }
        }
    }

    static getAll() {
        return {
            type: new GraphQLList(UserType),
            resolve: async () => {
                return await UserService.getAll();
            }
        }
    }
}