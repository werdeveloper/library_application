const mongoose = require('mongoose'),
  uniqueValidator = require('mongoose-unique-validator'),
  bcrypt = require('bcrypt'),
  BcryptService = new (require('../services/bcrypt.service'))();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: false
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: false
  },  

}, {
  timestamps: true
});

UserSchema.plugin(uniqueValidator); // For unique email validation

UserSchema.pre('save', async function(next){
  try{
    // Hash password
    const hashPasswordExec = await BcryptService.generateHash((this.password || '').trim());
      this.password = hashPasswordExec.data;
      next();
  } catch(err){
    next(err);
  }
});

UserSchema.methods.isValidPassword = async function password(password){
  try{
    return await BcryptService.compareHash(password, this.password);
  } catch(err){
    throw err;
  }
}

module.exports = mongoose.model('User', UserSchema);
