import mongoose from 'mongoose';
const User = mongoose.model('User');

export class UserService {

    constructor() { }

    static async getAll() {
        return await User.find();
    }

    static async getById(_id) {
        return await User.findOne({ _id })
                .select('email fullName createdAt isActive');
    }

    static async getByEmail(email) {
        return User.findOne({ email });
    }

    static async update(_id, user) {
        const options = { new: true };

        return User.findOneAndUpdate({ _id }, user, options);
    }

    static async create(payload) {
        let user = new User({
            fullName: payload.fullName,
            email: payload.email,
            password: payload.password
        });

        user.password = user.generatePassword(user.password);
        
        return await User.create(user);
    }

}
