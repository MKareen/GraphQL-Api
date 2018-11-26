import { GraphQLObjectType } from 'graphql';
import { UserQuery } from '../modules/user/queries';
import { ContactQuery } from '../modules/contact/queries';

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: UserQuery.getOne(),
        currentUser: UserQuery.getCurrentUser(),
        usersList: UserQuery.getAll(),

        contact: ContactQuery.getOne(),
        contacts: ContactQuery.getAllContacts(),
        searchContact: ContactQuery.searchContact(),
        userContacts: ContactQuery.getContactsByUser()
    })
});

export default RootQueryType;

