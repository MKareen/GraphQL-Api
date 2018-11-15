import { GraphQLObjectType } from  'graphql';
import { AuthMutation } from './auth/mutations';
import { ContactMutation } from './contact/mutations';
import { UserMutation } from './user/mutations';

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: AuthMutation.signup(),
        login: AuthMutation.login(),

        editUser: UserMutation.editUser(),

        addContact: ContactMutation.addContact(),
        editContact: ContactMutation.editContact(),
        deleteContact: ContactMutation.deleteContact(),
        addToFavourites: ContactMutation.addToFavourites()
    }
});

export default mutation;
