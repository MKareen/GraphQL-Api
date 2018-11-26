import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

export const GraphQLDate = new GraphQLScalarType({
    name: 'DateType',
    description: 'Date custom scalar type',
    serialize: (value) => value.getTime(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value);
        }

        return null;
    }
});
