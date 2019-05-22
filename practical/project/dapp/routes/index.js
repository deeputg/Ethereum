var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // web3.eth.getAccounts().then((data)=>{
  //   //console.log(data);
  // })
  res.render('index', { title: 'Case Management' });
});

//login page
router.get('/login',function(req,res){
  
  res.render("login",{title: 'Login page' });
})

// admin login post method
router.post('/login',function(req,res){
  //console.log(req.body.adminPassword);
  web3.eth.personal.unlockAccount(ownerAddr,req.body.adminPassword,600).then((err,result)=>{
   console.log(err);
    console.log("ssssssssssssssss"+result);
  })
  //res.redirect("/");
})


module.exports = router;
