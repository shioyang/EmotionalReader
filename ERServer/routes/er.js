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

/*
 * Request params
 *   paragraph: string;
 * Response
 *   anger: number;
 *   joy: number;
 *   fear: number;
 *   sadness: number;
 *   surprise: number;
 *   sentence: string;
 */
router.post('/paragraph', function(req, res){
  let paragraph = req.body.paragraph;
  let sentenceArr = paragraph.split(/[.!?]/);
  let defArr = [];
  let res_emotions = [];

  sentenceArr.forEach(function(sentence){
    defArr.push(new Promise(function(resolve, reject){
      indico.emotion(sentence)
        .then(function(res_emotion){
          res_emotion.sentence = sentence;
          res_emotions.push(res_emotion);
          resolve();
        })
        .catch(function(err){
          console.log(err);
          reject(err);
        });
    }));
  })

  Promise.all(defArr).then(function(){
    let obj = {
      paragraph: res_emotions
    };
    res.send(obj);
  })
  .catch(function(err){
    console.log(err);
  });
});

module.exports = router;
