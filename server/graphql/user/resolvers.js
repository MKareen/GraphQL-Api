import { UserService } from '../../services';

export class UserResolver {
    static async edit(payload, user) {
        try {
            return await UserService.update(user._id, payload);
        } catch(err) {
            throw err;
        }
    }
}
