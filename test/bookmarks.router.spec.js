const app = require('../src/app');



describe('App', () => {
  it('GET / responds with 200', () => {
    return supertest(app)
      .get('/bookmarks')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200);
  });
  it('GET / responds with 200 AND provides an array', () => {
    return supertest(app)
      .get('/bookmarks')
      .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
      });
  });
});