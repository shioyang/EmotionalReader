var express = require('express');
var router = express.Router();

var indico = require('indico.io');

var logError = function(err) { console.log(err); }

/* GET */
/*
 * Response
 *   API list
 */
router.get('/', function(req, res, next) {
  res.render('api_list', { title: 'ER API List' }); //TODO
});

/* GET */
router.get('/emotion', function(req, res){
  // single example
  indico.emotion("I did it. I got into Grad School. Not just any program, but a GREAT program. :-)")
    .then(function(res_emotion){
      res.send(res_emotion);
    })
    .catch(logError);
});

/* POST */
/*
 * Request params
 *   sentence: string;
 * Response
 *   anger: number;
 *   joy: number;
 *   fear: number;
 *   sadness: number;
 *   surprise: number;
 *   sentence: string;
 */
router.post('/sentence', function(req, res){
  let sentence = req.body.sentence;
  indico.emotion(sentence)
    .then(function(res_emotion){
      res_emotion.sentence = sentence;
      res.send(res_emotion);
    })
    .catch(logError);
});

module.exports = router;
