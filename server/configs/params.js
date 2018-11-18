import {
    apiPort,
    tokenSecret,
    facebookId,
    facebookSecret,
    facebookCallbackUrl
} from '../helpers/configs';

const params = {
    development: {
        apiPort,
        tokenSecret,
        facebookId,
        facebookSecret,
        facebookCallbackUrl
    },
    production: {
        apiPort,
        tokenSecret,
        facebookId,
        facebookSecret,
        facebookCallbackUrl
    }
};

export default params[process.env.NODE_ENV || 'development'];
