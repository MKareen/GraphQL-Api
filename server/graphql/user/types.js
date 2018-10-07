import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
const GraphQLDate = require('graphql-date');

const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: GraphQLID },
        fullName: { type: GraphQLString },
        email: { type: GraphQLString },
        createdAt: { type: GraphQLDate },
        updatedAt: { type: GraphQLDate }
    })
});

export default UserType;
