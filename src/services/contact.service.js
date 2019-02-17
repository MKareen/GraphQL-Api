import mongoose from 'mongoose';
const Contact = mongoose.model('Contact');

export class ContactService {

    constructor() { }

    static async getAll() {
        return await Contact.find();
    }

    static async getById(_id) {
        return await Contact.findOne({ _id });
    }

    static async create(contact) {
        return await Contact.create(contact);
    }

    static async getUserFavourites(id) {
        return await Contact.find({
            owner: id,
            isFavourite: true
        }).sort({
            firstName: 1
        });
    }

    static async search(query) {
        return await Contact.find(
            { $text: { $search: query } },
            { score: { $meta: 'textScore' } }
        ).sort({
            score: { $meta: 'textScore' }
        });
    }

    static async getByUserId(id) {
        return await Contact.find({ owner: id }).sort({ firstName: 1 });
    }

    static async update(_id, contact) {
        const options = { new: true };

        return await Contact.findOneAndUpdate({ _id }, contact, options);
    }

    static async delete(_id) {
        return await Contact.findOneAndRemove({ _id });
    }

}
