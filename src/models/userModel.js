const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true
        },
        lastname: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        bio: {
            type: String,
            required: false
        },
        birth: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);
