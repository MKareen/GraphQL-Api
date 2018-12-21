import mongoose from 'mongoose';
const Blacklist = mongoose.model('Blacklist');

export class BlacklistService {
    constructor() { }

    static async getAll() {
        return await Blacklist.find();
    }

    static async getByToken(token) {
        return await Blacklist.findOne({ token });
    }

    static async add(token) {
        return await Blacklist.create({ token });
    }

    static async remove(_id) {
        return await Blacklist.deleteOne({ _id });
    }
}
