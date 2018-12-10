import {
    apiUrl,
    appUrl,
    apiPort,
    tokenSecret,
    facebookId,
    facebookSecret,
    facebookCallbackUrl
} from '../helpers/configs';

const params = {
    development: {
        apiUrl,
        appUrl,
        apiPort,
        tokenSecret,
        facebookId,
        facebookSecret,
        facebookCallbackUrl
    },
    production: {
        apiUrl,
        appUrl,
        apiPort,
        tokenSecret,
        facebookId,
        facebookSecret,
        facebookCallbackUrl
    }
};

export default params[process.env.NODE_ENV || 'development'];
