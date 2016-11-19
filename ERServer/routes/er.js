var express = require('express');
var router = express.Router();

/* GET API list. */
router.get('/', function(req, res, next) {
  res.render('api_list', { title: 'ER API List' });
});

module.exports = router;
