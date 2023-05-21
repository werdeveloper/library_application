const mongoose = require('mongoose'),
  { Schema } = mongoose,
  uniqueValidator = require('mongoose-unique-validator'),
  bcrypt = require('bcrypt'),
  BcryptService = new (require('../services/bcrypt.service'))();
  
const genreSchema = new Schema({
  name: { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
}, {
  timestamps: true
});
  
module.exports = mongoose.model('Genre', genreSchema);
