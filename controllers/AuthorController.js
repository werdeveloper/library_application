const author = require('../models/author');

const UsersModel = require('../models/user'),
    BooksModel = require('../models/book'),
    AuthorModel = require('../models/author');

class AuthorController {

    constructor() {
        // this._DBService = new services.DBService();
    }

    // Get all Author lists
    allAuthor(req, res, next) {
        try {
            // get use data from database
            AuthorModel.find()
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

    // Create a Author
    async createAuthor(req, res, next) {
        try {
            let { name, biography } = req.body;
            console.log(req.body);
            // Save use data in the database
            const authorDB = new AuthorModel({ name, biography }),
            saveUser = await authorDB.save();
            res.send(saveUser);
        } catch (err) {
            if (err.isJoi === true) {
                err.status = 422;
            }
            next(err);
        }
    }

     // Adding author to Book
     async addingAuthorToBook(req, res, next) {
        try {
            const { authorId, bookId } = req.params;            

            const author = await AuthorModel.findById(authorId);
            if (!author) {
                return res.status(400).json({ error: 'Author not found' });
            }

            const book = await BooksModel.findById(bookId);
            if (!book) {
                return res.status(400).json({ error: 'Book not found' });
            }

            author.books.push(bookId);
            let resp = await author.save();

            res.status(200).json({error: null, data: resp});
        } catch (err) {
            if (err.isJoi === true) {
                err.status = 422;
            }
            next(err);
        }
    }
    
}

module.exports = AuthorController;
