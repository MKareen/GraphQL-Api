import { GraphQLScalarType } from 'graphql';
import { ObjectId } from 'bson';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const isObjectId =  (str) => {
    return objectIdPattern.test(str);
};

const parseObjectId = _id => {
    if (isObjectId(_id)) {
        return ObjectId(_id);
    }

    throw new Error('ObjectId must be a single String of 24 hex characters');
};

export const GraphQLObjectId = new GraphQLScalarType({
    name: 'ObjectId',
    description: 'The `ObjectId` scalar type represents a mongodb unique ID',
    serialize: value => value.toString(),
    parseValue: parseObjectId,
    parseLiteral: (ast) => {
        return parseObjectId(ast.value);
    }
});
