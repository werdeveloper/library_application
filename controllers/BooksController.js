const UsersModel = require('../models/user'),
    BooksModel = require('../models/book'),
    ReviewModel = require('../models/review');

class BooksController {

    constructor() {
        // this._DBService = new services.DBService();
    }

    // Get all books lists
    allBooks(req, res, next) {
        try {
            // get use data from database
            BooksModel.find()
            .populate('author')
            .populate('genres')
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

    // Attach a book to User
    async addingBooksToUser(req, res, next) {
        try {
            const { userId } = req.params;
            const { bookId } = req.body;

            const user = await UsersModel.findById(userId);
            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }

            const book = await BooksModel.findById(bookId);
            if (!book) {
                return res.status(400).json({ error: 'Book not found' });
            }

            user.books.push(bookId);
            let resp = await user.save();

            res.status(200).json({error: null, data: resp});
        } catch (err) {
            if (err.isJoi === true) {
                err.status = 422;
            }
            next(err);
        }
    }

    // Create Books
    async createBook(req, res, next) {
        try {            
            const { title, description, author } = req.body;

            // Save use data in the database
            const userDB = new BooksModel({ title, description, author }),
            saveUser = await userDB.save();

            res.status(200).json({error: null, data: saveUser});
        } catch (err) {
            if (err.isJoi === true) {
                err.status = 422;
            }
            next(err);
        }
    }

    // Delete a book
    async deleteBookFromUser(req, res, next) {
        try {
            const { userId, bookId } = req.params;
            
            const user = await UsersModel.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const bookIndex = user.books.indexOf(bookId);
            if (bookIndex === -1) {
                return res.status(404).json({ error: 'Book not found in user\'s collection' });
            }

            user.books.splice(bookIndex, 1);
            let resp = await user.save();

            res.status(200).json({error: null, data: resp});
        } catch (err) {
            if (err.isJoi === true) {
                err.status = 422;
            }
            next(err);
        }
    }

    // Update review for book
    async updateRevoewForBook(req, res, next) {
        try {
            const { bookId, reviewId } = req.params;
            const { userId, rating, comment } = req.body;

            const book = await BooksModel.findById(bookId);``
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }

            const review = await ReviewModel.findById(reviewId);
            if (!review) {
                return res.status(404).json({ error: 'Review not found' });
            }

            review.rating = rating;
            review.comment = comment;
            let reviewRes = await review.save();
            
            /* async.waterfall(
                [
                    function (callback) {
                        BooksModel.findByIdAndUpdate(
                        bookId,
                        { $push: { reviews: { user: userId, rating, comment } } },
                        { new: true },
                        (err, book) => {
                            if (err) {
                            console.error(err);
                            return callback(err);
                            }
                            callback(null, book);
                        });
                    },
                    function (book, callback) {
                            ReviewModel.findOneAndUpdate(
                            { book: bookId, user: userId },
                            { rating, comment },
                            { upsert: true, new: true },
                            (err, review) => {
                                if (err) {
                                console.error(err);
                                return callback(err);
                                }
                                callback(null, book, review);
                            }
                            );
                    },
                ],
                (err, book, review) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Internal server error' });
                    }
                    res.status(200).json({error: false, data: review});
                }
            ); */

            res.status(200).json({error: false, data: reviewRes});

        } catch (err) {
            if (err.isJoi === true) {
                err.status = 422;
            }
            next(err);
        }
    }

    // Search for books by title, author, or genre
    async searchBookasync(req, res) {
        const { query } = req.query;
        const regexQuery = new RegExp(query, 'i');
        try {        

            const Book = await BooksModel.find().populate('author genre reviews');
                    
            /* const books = await BooksModel.find({
                $or: [
                //   { title: { $regex: regexQuery } },
                //   { author: { $regex: regexQuery } },
                //   { genre: { $regex: regexQuery } }

                { title: regexQuery },
                { author: regexQuery },
                { genre: regexQuery }
                ]
            })
            .populate('author genre reviews'); */

          res.status(200).json({error: false, data: Book});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
}

module.exports = BooksController;
