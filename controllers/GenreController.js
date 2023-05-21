const UsersModel = require('../models/user'),
    BooksModel = require('../models/book'),
    AuthorModel = require('../models/author'),
    GenreModel = require('../models/genre');

class GenreController {

    constructor() {
        // this._DBService = new services.DBService();
    }

    // Get all Genre lists
    allGenre(req, res, next) {
        try {
            // get use data from database
            GenreModel.find()
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

    // Create a Genre
    async createGenre(req, res, next) {
        try {
            let { name } = req.body;
            console.log(req.body);
            // Save use data in the database
            const authorDB = new GenreModel({ name }),
            saveUser = await authorDB.save();
            res.send(saveUser);
        } catch (err) {
            if (err.isJoi === true) {
                err.status = 422;
            }
            next(err);
        }
    }

    // Adding Genre to Book
    async addingGenreToBook(req, res, next) {
        try {
            const { genreId } = req.params;
            const { bookId } = req.body;

            const genre = await GenreModel.findById(genreId);
            if (!genre) {
                return res.status(404).json({ error: 'Genre not found' });
            }

            const book = await BooksModel.findById(bookId);
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }

            genre.books.push(bookId);
            let resp = await genre.save();

            res.status(200).json({error: null, data: resp});
        } catch (err) {
            if (err.isJoi === true) {
                err.status = 422;
            }
            next(err);
        }
    }
    
}

module.exports = GenreController;
