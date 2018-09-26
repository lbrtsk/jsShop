const request = require('supertest');

const server = require('../server');

describe('App tests', () => {
  const app = server;

  before(function(done) {
    app.listen();
    done();
  });

  it('GET /products should return status 200', (done) => {
    request(app)
      .get('/products')
      .expect(200, done);
  });

  it('GET on unknown address should return status 404', (done) => {
    request(app)
      .get('/someaddressthatdoesnotexist')
      .expect(404, done);
  });
});
