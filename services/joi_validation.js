const Joi = require('joi');
// Validate request body for adding books to the user's collection
const validateAddBookToUser = (req, res, next) => {
    const schema = Joi.object({
      bookId: Joi.string().required()
    });
  
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
  
    next();
  };
  
  // Validate request parameters for removing books from the user's collection
  const  validateRemoveBookFromUser = (req, res, next) => {
    const schema = Joi.object({
      userId: Joi.string().required(),
      bookId: Joi.string().required()
    });
  
    const { error } = schema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
  
    next();
  };
  
  // Validate request body for updating reviews
  const validateUpdateReview = (req, res, next) => {
    const schema = Joi.object({
      rating: Joi.number().integer().min(1).max(5).required(),
      comment: Joi.string().optional().allow('')
    });
  
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
  
    next();
  };

module.exports = {
  validateAddBookToUser,
  validateRemoveBookFromUser,
  validateUpdateReview
}
  