var express = require('express');
var router = express.Router();

var indico = require('indico.io');
//var response = function(res) { console.log(res); }
var logError = function(err) { console.log(err); }

/* GET API list. */
router.get('/', function(req, res, next) {
  res.render('api_list', { title: 'ER API List' });
});

/* POST */
router.get('/emotion', function(req, res){
//router.post('/emotion', function(req, res){
  // single example
  indico.emotion("I did it. I got into Grad School. Not just any program, but a GREAT program. :-)")
    .then(function(res_emotion){
      res.send(res_emotion);
    })
    .catch(logError);
});

module.exports = router;
