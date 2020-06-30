const Router = require('express-promise-router')
const db = require('../db/index')
var moment = require('moment');
const { post } = require('../app');
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
// export our router to be mounted by the parent application
router.post('/', async (req, res, next) => {
    if (req.body.movie_id && req.body.review_text && req.body.review_title && req.body.reviewer_id)
        postReview(req, res, next, req.body.movie_id, req.body.review_text, req.body.review_title, req.body.reviewer_id, req.body.stars, req.body.imbid);
    else
        res.json({status: 400})
})

function postReview(request, response, next, movie_id, review_text, review_title, reviewer_id, stars = null, imbid = null) {
    db.query('INSERT INTO reviews (last_updated, movie_id, review_text, review_title, reviewer_id, stars, imdbid) VALUES (current_timestamp, $1, $2, $3, $4, $5, $6)',
     [movie_id, review_text, review_title, reviewer_id, stars, imbid], 
     (err, res) => {
         if (err) {
             console.log(err)
            response.send({status: 500});
         }
        else
            response.send({status: 200})
     })
}
module.exports = router