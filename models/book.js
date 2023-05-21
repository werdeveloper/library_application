const mongoose = require('mongoose'),
  { Schema } = mongoose,
  uniqueValidator = require('mongoose-unique-validator'),
  bcrypt = require('bcrypt'),
  BcryptService = new (require('../services/bcrypt.service'))();

const bookSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
  }, {
    timestamps: true
  });
  
module.exports = mongoose.model('Book', bookSchema);

