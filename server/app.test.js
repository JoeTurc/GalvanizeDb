const supertest = require('supertest');
const app = require('./app')
const fs = require("fs")
const request = supertest(app)

const movies = JSON.parse(fs.readFileSync("movies.JSON"))

/*jest.mock('./db/index');

const {query} = require('./db/index');
const mDb = jest.fn();
query.mockImplementation(() => mDb)

beforeEach(() => {
  query.mockClear();
  mDb.mockClear();
});*/

test("GET /", done => {
  supertest(app)
    .get("/")
    .expect(200, JSON.stringify({greeting: "Hello World"}))
    .end(done)
})

test("GET /movies", done => {
  supertest(app)
    .get("/movies")
    .set('Content-Type', 'application/json')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, movies)
    .end(done)
})

test("POST /reviews", done => {
  supertest(app)
  .post('/reviews')
  .send({movie_id: 1, review_text: "This is the best ever", review_title: "Glowing review", reviewer_id: 2})
  .set('Accept', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200)
  done()
})

it('GETs the expected data from movies endpoint', async done => {
  const res = await request.get('/movies')
  let expected = (res.body[0]["movieId"])
  expect(expected).toEqual(1)
  done()
})

it('GETs the movies endpoint', async done => {
  const response = await request.get('/movies')
  expect(response.status).toBe(200)
  done()
})

