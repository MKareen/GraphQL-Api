import { UserService } from '../../services';
import { BadRequest } from '../../errors';

export class UserResolver {
    static async edit(payload, user) {
        try {
            const checkUser = await UserService.getByEmail(payload.email);

            if (checkUser && checkUser.email !== user.email) {
                throw new BadRequest('Email alraedy used');
            }

            return await UserService.update(user._id, payload);
        } catch(err) {
            throw err;
        }
    }
}
