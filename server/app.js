import express from 'express';
import expressGraphQL from 'express-graphql';
import { json, urlencoded } from 'body-parser';
import RateLimit from 'express-rate-limit';
import limiter from './configs/limiter';
import cookieParser from 'cookie-parser';
import params from './configs/params';
import schema from './graphql/schema';
import cors from 'cors';
import logger from 'morgan';
import jwt from 'jsonwebtoken';

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

        this.app.use(cors())
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
                    req.currentUser = await jwt.verify(token, params.tokenSecret);
                } catch (err) {
                    console.error(err);
                }
            }
            next();
        });

    }

    setParams() {
        this.app.set('json spaces', 4);
    }

    configGraphQL() {
        this.app.use('/graphql', expressGraphQL((req, res) => {
            return {
                schema,
                graphiql: true,
                context: req
            };
        }));
    }

}

export default () => new Application().app;
