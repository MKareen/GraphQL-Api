import { GraphQLObjectType } from  'graphql';
import { AuthMutation } from '../modules/auth/mutations';
import { ContactMutation } from '../modules/contact/mutations';
import { UserMutation } from '../modules/user/mutations';

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: AuthMutation.signup(),
        login: AuthMutation.login(),
        logout: AuthMutation.logout(),

        editUser: UserMutation.editUser(),

        addContact: ContactMutation.addContact(),
        editContact: ContactMutation.editContact(),
        deleteContact: ContactMutation.deleteContact(),
        addToFavourites: ContactMutation.addToFavourites()
    }
});

export default mutation;
