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
  data= [];

  web3.eth.getBalance(req.session.userAddr).then((data)=>{
    console.log("Balance is "+data)
    if(req.session.superAdmin)
      data.superAdminPanel=true;
      res.render('index', { title: 'Case Management',data:data });
    }).catch((err)=>{
      console.log("Error getting Balance"+err);
    });

  
});




module.exports = router;
