const app = require('../src/app');
const { bookmarks }= require('../src/store');

const id = bookmarks[0].id;

describe('GET', () => {
  it('GET / responds with 200', () => {
    return supertest(app)
      .get('/')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200, 'Hello, World!');
  });
  it('GET /bookmarks responds with 200', () => {
    return supertest(app)
      .get('/bookmarks')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200);
  });
  it('GET /bookmarks responds with 200 AND provides an array', () => {
    return supertest(app)
      .get('/bookmarks')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
      });
  });
  it('GET / responds with 400 if no authorization', () => {
    return supertest(app)
      .get('/bookmarks')
      .expect(400);
  });
  it('GET / responds with 400 if no bearer', () => {
    return supertest(app)
      .get('/bookmarks')
      .set('Authorization', '')
      .expect(400, '{"error":"Missing bearer token"}');
  });
  it('POST /bookmarks responds with 201 and returns the object', () => {
    return supertest(app)
      .post('/bookmarks')
      .send({"title": "Google","url": "https://www.google.com","description": "Where we find everything else","rating": 4})
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('object');
      });
  });
  it('GET /bookmarks/:id responds with 200 and the item', () => {
    return supertest(app)
      .get(`/bookmarks/${id}`)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200, [bookmarks[0]]);
  });
  it('Delete /bookmarks/:id responds with 204', () => {
    return supertest(app)
      .delete(`/bookmarks/${id}`)
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(204);
  });
});
