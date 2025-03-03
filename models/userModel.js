const mongoose=require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
     name:{
       type:String,
       required: [true,'Please tell us your name!']
     },
     email:{
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
      },
      password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: 8,
        select: false,
      },
      passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          //this only works for create and save;
          validator: function (el) {
            return el == this.password;
          },
          message: 'Passwords are not same!',
        },
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;