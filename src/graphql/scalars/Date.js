import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export const GraphQLDate = new GraphQLScalarType({
    name: 'DateType',
    description: 'Date custom scalar type',
    serialize: (value) => value.getTime(), // value sent to the client
    parseValue: (value) => new Date(value), // value from the client
    parseLiteral: (ast) => { // ast value is always in string format
        if (ast.kind === Kind.INT) {
            return new Date(ast.value);
        }

        return null;
    }
});
