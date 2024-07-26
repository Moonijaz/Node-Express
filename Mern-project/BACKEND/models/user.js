const mongoose = require('mongoose'); 


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    color: {
        type: String,
        required: true,
    }, 
    icon: {
        type: String,
        required: true,
    }, 

});

const User = mongoose.model('User', userSchema);
module.exports = User;    