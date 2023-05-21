const review = require('../models/review');

const UsersModel = require('../models/user'),
    BooksModel = require('../models/book'),
    AuthorModel = require('../models/author'),
    GenreModel = require('../models/genre'),
    ReviewModel = require('../models/review');

class ReviewController {

    constructor() {
        // this._DBService = new services.DBService();
    }

    // Get all Genre lists
    allReview(req, res, next) {
        try {
            // get use data from database
            ReviewModel.find()
            .exec((err, books) => {
              if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
              }
              res.status(200).json({error: false, data: books});
            });
        } catch (err) {
            next(err);
        }
    }

    // Create a Review
    async createReview(req, res, next) {
        try {
            let { rating, comment, bookId, userId } = req.body;
            console.log(req.body);

            const user = await UsersModel.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const book = await BooksModel.findById(bookId);
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }

            // Save use data in the database
            const authorDB = new ReviewModel({ rating, comment, book: bookId, user: userId }),
            saveUser = await authorDB.save();
            res.send(saveUser);
        } catch (err) {
            if (err.isJoi === true) {
                err.status = 422;
            }
            next(err);
        }
    }
    
}

module.exports = ReviewController;
