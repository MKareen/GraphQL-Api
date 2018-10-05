import moment from 'moment';
import * as jwt from 'jsonwebtoken';
import params from '../configs/params';

export default class Utils {

    static signJWTToken(user) {
        const payload = { id: user._id, created_at: moment().toString() };

        const token = jwt.sign(payload, params.tokenSecret);

        return { token };
    }

}