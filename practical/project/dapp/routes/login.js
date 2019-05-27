var express = require('express');


var router = express.Router();

router.get('/',function(req,res){
  res.render("login",{title: 'Login page',accounts:accList });
})

router.post('/',function(req,res){
    if(!req.session.userAddr){
        web3.eth.personal.unlockAccount(ownerAddr,req.body.adminPassword,600).then((result)=>{
            req.session.userAddr=ownerAddr;
            req.session.superAdmin =true;
            res.redirect("/")
          }).catch((secondResult)=>{
            res.redirect("/login?al=fail");
          })
    }
})

router.post("/policestation",function(req,res,next){
    if(!req.session.userAddr){
        web3.eth.personal.unlockAccount(req.body.stationAddr,req.body.stationPassword,600).then((result)=>{
            req.session.userAddr=req.body.stationAddr;
            res.redirect("/")
          }).catch((secondResult)=>{
            res.redirect("/login?psl=fail");
          })
    }
})

module.exports = router;