const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, 
    googleId: { type: String, sparse: true }, 
    amount: { type: Number, default: 0 },
    account_number: { type: String, required: function() { return !this.googleId; }, unique: true },
    file: { type: String, required: false },
    profilePhoto: { type: String },  
}, {
    timestamps: true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
