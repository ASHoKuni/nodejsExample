const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    id:{
        required: true,
        type: String
    },
    roleName:{
        required: true,
        type: String
    }

});


const Role = mongoose.model('Role',roleSchema);
module.exports = Role;