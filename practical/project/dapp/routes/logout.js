var express = require('express');
var expressSession = require('express-session')
var router = express.Router();

var sess = {
    secret: 'blockchain-kurumb',
    cookie: {}
  }
  
router.use(expressSession(sess));

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("session distroid")
    req.session.destroy();
     res.redirect('/login');
});




module.exports = router;
