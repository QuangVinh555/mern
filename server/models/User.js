const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: 'string',
        require: true,
        unique: true,
    },
    password:{
        type: 'string',
        require: true,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})
                        // 'users': Ten collection trong db
module.exports = mongoose.model('users', UserSchema)