import express from 'express';
import expressGraphQL from 'express-graphql';
import { json, urlencoded } from 'body-parser';
import RateLimit from 'express-rate-limit';
import limiter from './configs/limiter';
import cookieParser from 'cookie-parser';
import schema from './graphql/schema';
import cors from 'cors';
import logger from 'morgan';
import Utils from './helpers/utils';
import { AuthError } from './errors';
import passport from 'passport';
import authenticate from './middlewares/passport';
import configPassport from './strategies/facebook';
import DataLoader from 'dataloader';
import { SUCCESS_CODE } from './configs/status-codes';

class Application {
    app;

    constructor () {
        this.app = express();
        this.initApp();
    }
    initApp() {
        this.configApp();
        this.configAuthentication();
        this.setParams();
        this.facebookAuth();
        this.configGraphQL();
    }

    configApp() {
        if (this.app.get('env') !== 'production') {
            this.app.use(logger('dev'));
        }

        this.app.use(cors())
                .use(json())
                .use(urlencoded({ extended: true }))
                .use(cookieParser())
                .use(this.createLimiter());
    }

    createLimiter() {
        return new RateLimit(limiter);
    }

    facebookAuth() {
        configPassport(passport);
        this.app.use(passport.initialize())
                .use(passport.session());

        this.app.get('/fblogin', authenticate);
        this.app.get('/auth/facebook/callback', authenticate, async (req, res) => {
            const tokenInfo = await Utils.signJWTToken(req.user);
            res.status(SUCCESS_CODE).json({
                accessToken: tokenInfo.token, 
                user: req.user
            });
        });

        this.app.get('/fb/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });
    }

    configAuthentication() {
        this.app.use(async (req, res, next) => {
            const token = req.headers['authorization'];
            if (token !== 'null') {
                try {
                    req.currentUser = await Utils.verifyJWTToken(token);
                } catch (err) {
                    throw new AuthError('Unauthorized');
                }
            }
            next();
        });

    }

    setParams() {
        this.app.set('json spaces', 4);
    }

    configGraphQL() {
        this.app.use('/graphql', expressGraphQL((req) => {
            return {
                schema,
                graphiql: true,
                context: req,
                pretty: true,
                formatError: error => ({
                    message: error.message,
                    state: error.originalError && error.originalError.state,
                    locations: error.locations,
                    path: error.path,
                }),
            };
        }));
    }

}

export default () => new Application().app;
