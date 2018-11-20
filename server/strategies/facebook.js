import FacebookStrategy from 'passport-facebook';
import params from '../configs/params';
import mongoose from 'mongoose';
import { UserService } from '../services';
import { NOT_EXISTS } from '../configs/constants';
import { AuthError } from '../errors';

const User = mongoose.model('User');

export default passport => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        let user = await User.query().findById(id)
                .first();
        user ? done(null, user) : done(new AuthError(NOT_EXISTS), null);
    });

    const fbOptios = {
        clientID: params.facebookId,
        clientSecret: params.facebookSecret,
        callbackURL: params.facebookCallbackUrl,
        profileFields: ['id', 'email', 'name'],
    };

    let strategy = new FacebookStrategy (fbOptios, async (accessToken, refreshToken, profile, cb) => {
        try {
            const loggedUser = profile._json;
            const fullName = `${loggedUser.first_name} ${loggedUser.last_name}`;

            const existingUser = await UserService.getByFacebookId(loggedUser.id);
            if (existingUser) {
                cb(null, existingUser);
            } else {
                const data = {
                    facebookId: loggedUser.id,
                    email: loggedUser.email,
                    fullName,
                };
    
                await UserService.createFacebookUser(data);
            }

            cb(null, profile);
        } catch(err) {
            cb(null, profile);
        }
    });
    passport.use(strategy);
};
