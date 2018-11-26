import { UserService } from '../../../services';
import Utils from '../../../helpers/utils';
import { AuthError, BadRequest } from '../../../errors';
import { INVALID_EMAIL_OR_PASSWORD } from '../../../configs/constants';

export class AuthResolver {

    static async signup(payload) {
        try {
            let user = await UserService.getByEmail(payload.email);

            if (user) {
                throw new BadRequest(INVALID_EMAIL_OR_PASSWORD);
            }
    
            user = await UserService.create(payload);
    
            const tokenInfo = await Utils.signJWTToken(user);
    
            return {
                accessToken: tokenInfo.token,
                user
            };
        } catch(err) {
            throw err;
        }
    }

    static async login(payload) {
        const { email, password } = payload;
    
        let user;
        try {
            user = await UserService.getByEmail(email);
    
            if (!user || !user.comparePassword(password)) {
                throw new AuthError('Invalid email or password');
            }
    
            const tokenInfo = await Utils.signJWTToken(user);
    
            return {
                accessToken: tokenInfo.token,
                user
            };
        }
        catch (err) {
            throw err;
        }
    }
    
}
