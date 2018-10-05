import { UserService } from '../../services';
import { BadRequest } from '../../errors';
import Utils from '../../helpers/utils';

export class AuthResolver {

    static async signup(payload) {
        try {
            let user = await UserService.getByEmail(payload.email);
    
            if (user) {
                throw new Error('email-unique');
            }
    
            user = await UserService.create(payload);
    
            const tokenInfo = await Utils.signJWTToken(user);
    
            return {
                accessToken: tokenInfo.token,
                user
            }
        } catch(err) {
            console.log(err);
        }   
    }

    static async login(payload) {
        const { email, password } = payload;
    
        let user;
        try {
            user = await UserService.getByEmail(email);
    
            if (!user || !user.comparePassword(password)) {
                return next(new BadRequest('invalid-email-or-password'));
            }
    
            const tokenInfo = await Utils.signJWTToken(user);
    
            return {
                accessToken: tokenInfo.token,
                user
            };
        }
        catch (err) {
            console.log(err);
        }
    }
    
}
