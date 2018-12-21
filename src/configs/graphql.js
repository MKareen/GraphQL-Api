import schema from '../graphql/schema/schema';

export default (req) => {
    return {
        schema,
        context: {
            req,
            currentUser: req.currentUser
        },
        pretty: true,
        formatError: error => ({
            message: error.message,
            state: error.originalError && error.originalError.state,
            locations: error.locations,
            path: error.path,
        }),
    };
};
