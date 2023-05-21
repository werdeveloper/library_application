const request = require('supertest');
const app = require('../server');

beforeEach(()=>{
  console.log("Testing Start", new Date());
});

afterEach(()=>{
  console.log("Testing Finish", new Date());
});

describe('Library Application', () => {
  try{
    // Book Lists
    it('Book Lists', (done) => {
      request(app)
      .get(`/books`)
      .set('Accept', 'application/json')        
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
          if (err){
              return done(err);
          }
          // let resp = JSON.parse(res.text);
          return done();
      });
    });

    // Add a book to the user
    it('Add a book to the user', async () => {
      const response = await request(app)
        .post('/users/64687833f66f4f3ef099626a/books')
        .send({ bookId: '6469d9c733bb94a208c8de64' });
      expect(response.status).toBe(200);    
    });

    // Remove a book from the user
    it('Remove a book from the user', async () => {
      const response = await request(app).delete('/users/64687833f66f4f3ef099626a/books/6469d9c733bb94a208c8de64');
      expect(response.status).toBe(200);
    });

    // Update the reviews for a book
    it('Update the reviews for a book', async () => {
      const response = await request(app)
        .put('/books/6469d9c733bb94a208c8de64/reviews/6469df043a3ef076002ff9f9')
        .send({ rating: 5, comment: 'Great book!' });
      expect(response.status).toBe(200);
    });

    // Search for books by title, author, or genre
    it('search for books by title, author, or genre', async () => {
      const response = await request(app).get('/search?query=deep');
      expect(response.status).toBe(200);
    });
    
  } catch(err){
    console.log(err);
  }
});
