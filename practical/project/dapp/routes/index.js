var express = require('express');
var router = express.Router();

//middleware test
authCheck = function(req,res,next){
  console.log("Middleware ROuter : login=>authcheck");
  if(!req.session.userAddr){
      res.redirect("/login")
  }
  next()
}

/* GET home page. */
router.get('/',authCheck, function(req, res, next) {
  // web3.eth.getAccounts().then((data)=>{
  //   //console.log(data);
  // })
  res.render('index', { title: 'Case Management' });
});




module.exports = router;
