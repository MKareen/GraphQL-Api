import express from 'express';
import expressGraphQL from 'express-graphql';
import { json, urlencoded } from 'body-parser';
import RateLimit from 'express-rate-limit';
import limiter from './configs/limiter';
import cookieParser from 'cookie-parser';
import schema from './graphql/schema/schema';
import cors from 'cors';
import corsOptions from './configs/cors';
import logger from 'morgan';
import Utils from './helpers/utils';
import { AuthError } from './errors';

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
        this.configGraphQL();
    }

    configApp() {
        if (this.app.get('env') !== 'production') {
            this.app.use(logger('dev'));
        }

        this.app.use(cors(corsOptions))
                .use(json())
                .use(urlencoded({ extended: true }))
                .use(cookieParser())
                .use(this.createLimiter());
    }

    createLimiter() {
        return new RateLimit(limiter);
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
        }));
    }
}

export default () => new Application().app;
