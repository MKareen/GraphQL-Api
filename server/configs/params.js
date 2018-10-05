import {
    apiPort,
    tokenSecret
} from '../helpers/configs';

const params = {
    development: {
        apiPort,
        tokenSecret
    },
    production: {
        apiPort,
        tokenSecret
    }
};

export default params[process.env.NODE_ENV || 'development'];
