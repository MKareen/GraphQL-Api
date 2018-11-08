import express from 'express';
import expressGraphQL from 'express-graphql';
import { json, urlencoded } from 'body-parser';
import RateLimit from 'express-rate-limit';
import limiter from './configs/limiter';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import configPassport from './strategies/passport-jwt';
import params from './configs/params';
import schema from './graphql/schema';
import cors from 'cors';
import logger from 'morgan';
import authenticate from './middlewares/passport';
import jwt from 'jsonwebtoken';

class Application {
    app;

    constructor () {
        this.app = express();
        this.initApp();
    }
    initApp() {
        this.configApp();
        this.configPassport();
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
                .use(this.createLimiter())
    }

    createLimiter() {
        return new RateLimit(limiter);
    }

    configPassport() {
        configPassport(params.tokenSecret, passport);
        this.app.use(passport.initialize())
                .use(passport.session())
                // .use(async (req, res, next) => {
                //     const token = req.headers["authorization"];
                //     if (token !== 'null') {
                //         try {
                //             console.log(token);
                //             const user = await jwt.verify(token, params.tokenSecret);
                //             console.log(user, 'wrfwergergergr');
                //             req.user = user;
                //             console.log(req.user);
                //         } catch (e) {
                //             console.error(e);
                //         }
                //     }
                //     next();
                // })
                .use('/graphql', (req, res, next) => {
                    passport.authenticate('jwt', { session: false }, (err, user, info) => {
                      if (user) {
                        req.user = user
                      }
                      next()
                    })(req, res, next)
                  })
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
            }
        }));
    }

}

export default () => new Application().app;