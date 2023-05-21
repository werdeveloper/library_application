module.exports = (app) => {        
    const bookController = new (require('./controllers/BooksController'))(),
    userController = new (require('./controllers/UserController'))(),
    authorController = new (require('./controllers/AuthorController'))(),
    genreController = new (require('./controllers/GenreController'))(),
    rviewController = new (require('./controllers/ReviewController'))(),
    joi_validation =  require('./services/joi_validation');

    // Get Users list
    app.get('/userList', userController.allUsers);

    // Get Single User detail
    app.get('/userDetail/:userId', userController.userDetail);

    // Update user details via user Id
    app.put('/userUpdate/:userId', userController.userUpdate);

    // Delete User detais via userId
    app.delete('/userDelete/:userId', userController.deleteUser);

    // Create User
    app.post('/userCreate', userController.createUser);

    /*********************************** Books ******************************************/

    // Fetching the list of books
    app.get('/books', bookController.allBooks);

    // Book Create
    app.post('/books', bookController.createBook);

    // Adding books to the user
    app.post('/users/:userId/books', joi_validation.validateAddBookToUser, bookController.addingBooksToUser);

    // Removing books from the user
    app.delete('/users/:userId/books/:bookId', joi_validation.validateRemoveBookFromUser, bookController.deleteBookFromUser);

    // Search for books by title, author, or genre
    app.get('/search', bookController.searchBookasync);
    

    /*********************************** Author ******************************************/
    // Create Author
    app.post('/author', authorController.createAuthor);

    // Adding Author to the Book
    app.post('/author/:authorId/book/:bookId', authorController.addingAuthorToBook);

    // Author Lists
    app.get('/author', authorController.allAuthor);

    /*********************************** Genre ******************************************/

    // Create Genre
    app.post('/genre', genreController.createGenre);

    // Adding Genre to the Book
    app.post('/genre/:genreId', genreController.addingGenreToBook);

    // Genre Lists
    app.get('/genre', genreController.allGenre);

    /*********************************** Review  ******************************************/

    // Review Lists
    app.post('/review', rviewController.createReview);

    // Updating the reviews for a book
    // app.put('/users/:userId/books/:bookId', bookController.updateRevoewForBook);
    app.put('/books/:bookId/reviews/:reviewId', joi_validation.validateUpdateReview, bookController.updateRevoewForBook);

    // Review Lists
    app.get('/review', rviewController.allReview);

}
