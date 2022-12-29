const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: Date,
        default:Date.now
    },
    updatedBy:{
        type: Date,
        default: Date.now

    }
},{timestamps: true});

const User = mongoose.model('User',userSchema);
module.exports = User;