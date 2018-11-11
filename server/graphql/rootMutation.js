import { GraphQLObjectType } from  'graphql';
import { AuthMutation } from './auth/mutations';
import { ContactMutation } from './contact/mutations';

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: AuthMutation.signup(),
        login: AuthMutation.login(),

        addContact: ContactMutation.addContact(),
        editContact: ContactMutation.editContact(),
        deleteContact: ContactMutation.deleteContact(),
        addToFavourites: ContactMutation.addToFavourites()
    }
});

export default mutation;
