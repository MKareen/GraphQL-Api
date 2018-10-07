import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } from  'graphql';
import { AuthMutation } from './auth/mutations';

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: AuthMutation.signup(),
        login: AuthMutation.login()
    }
});

export default mutation;
