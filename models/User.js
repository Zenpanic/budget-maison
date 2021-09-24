const mongoose = require('mongoose');
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;

const user = new mongoose.Schema({

    username: {
        type: String,
        default: '',
        unique: true
    },
    email: {
        type: String,
        default: '',
        unique: true
    },
    password: {
        type: String,
        default: ''
    },
    signupDate: {
        type: Date,
        default: new Date()
    },
    projects: [String],
    refreshTokens: [String]
});

const encKey = process.env.ENCKEY;

mongoose.models = {};

user.plugin(mongooseFieldEncryption, { fields: ["password"], secret: `${encKey}` });

const User = mongoose.model('User', user);

export default User;