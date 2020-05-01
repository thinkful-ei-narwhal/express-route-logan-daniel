const express = require('express');
const bookmarksRouter = express.Router();


describe('App', () => {
  it('GET / responds with 200', () => {
    return supertest(bookmarksRouter)
      .get('/')
      .expect(200);
  });
  it('GET / responds with 200 AND provides an array', () => {
    return supertest(bookmarksRouter)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
      });
  });
});