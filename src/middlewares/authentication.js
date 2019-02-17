import Utils from '../helpers/utils';
import { BlacklistService } from '../services';

export default async (req, res, next) => {
    const handler = {
        get: (target, name) => {
            return target[name] !== 'Bearer null' ? target[name] : null;
        }
    };

    let proxy = new Proxy(req.headers, handler);

    let token = proxy.authorization;

    if (token) {
        token = token.replace('Bearer ', '');
        let blacklist = await BlacklistService.getByToken(token);

        if (!blacklist) {
            try {
                req.currentUser = await Utils.verifyJWTToken(token);
            } catch (err) {
                throw new Error('Unauthorized');
            }
        }
    }
    
    next();
};
