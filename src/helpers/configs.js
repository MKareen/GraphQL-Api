if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

import env from 'env-var';

export const mongoUrl = env.get('MONGODB_URI').asString();
export const tokenSecret = env.get('TOKEN_SECRET').asString();
export const apiPort = env.get('PORT').asString();

export const facebookId = env.get('FACEBOOK_ID').asString();
export const facebookSecret = env.get('FACEBOOK_SECRET').asString();
export const facebookCallbackUrl = env.get('FACEBOOK_CALLBACK_URL').asString();
