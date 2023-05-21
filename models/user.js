const mongoose = require('mongoose'),
  { Schema } = mongoose,
  uniqueValidator = require('mongoose-unique-validator'),
  bcrypt = require('bcrypt'),
  BcryptService = new (require('../services/bcrypt.service'))();

// Users Collection
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = mongoose.model('Users', userSchema);
