export default (mongoose) => {
    let ContactSchema = mongoose.Schema({
        owner: { type: String, required: true, ref: 'User' },
        firstName: { type: String, unique: true, required: true },
        lastName: String,
        phone: { type: String, required: true, unique: true },
        address: String,
        email: String,
        isFavourite: { type: Boolean, default: false },
        createdAt: Date,
        updatedAt: Date
    });

    ContactSchema.index({
        "$**": "text"
      });

    ContactSchema.pre('save', function(next) {
        const now = new Date();

        this.updatedAt = now;

        if (!this.createdAt) {
            this.createdAt = now;
        }

        next();
    });

    return mongoose.model('Contact', ContactSchema);
};
