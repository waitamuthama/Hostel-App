var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/group', function(req, res, next) {
  res.render('', { title: 'banking' });
});



module.exports = router;
