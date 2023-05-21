const mongoose = require('mongoose'),
  { Schema } = mongoose,
  uniqueValidator = require('mongoose-unique-validator'),
  bcrypt = require('bcrypt'),
  BcryptService = new (require('../services/bcrypt.service'))();
  
const reviewSchema = new Schema({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    comment: { type: String }
}, {
  timestamps: true
});
  
module.exports = mongoose.model('Review', reviewSchema);
