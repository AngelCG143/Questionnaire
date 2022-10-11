const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    userName: { type: String,
    required:[true, "User name is required!"]},
    email: {
    type: String,
    required: [true, "Email is required!"]
    },
    password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Should be at least 8 characters long!"]
    },
}, {timestamps: true});

UserSchema.virtual('confirmPassword')
.get( () => this._confirmPassword )
.set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', async function(next) {
    console.log("Pre saved middleware", this.password)
    try{
        const hashedPassword = await bcrypt.hash(this.password,10)
        console.log("Hashed password:", hashedPassword)
        this.password = hashedPassword
        next()
    }catch(error){
        console.log("Error in save", error)
    }
});

module.exports = mongoose.model('User', UserSchema )