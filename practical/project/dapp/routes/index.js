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
  data= {};

  /* 
  Checking if the contract balance is less than 200 and if yes , transwering 1000 ether from the coinbase to the contract
  */
  web3.eth.getBalance(contractAddress).then((conBal)=>{
    console.log("Contract Account Balance is "+conBal)
    if(web3.utils.fromWei(conBal,'ether')<=200){
      CaseReg.methods.allocateCoins().send({from:ownerAddr,gas:6000000,value:web3.utils.toWei('1000','ether').toString()}).then((paidStatus)=>{
          console.log("1000 ether transfered to Contract !!paid Status "+paidStatus);
      }).catch((err)=>{
          console.log("!!!IMPOERANT!!! Error when calling allocateCoins [index router] "+err);
      })
    }
  }).catch((err)=>{
    console.log("Error while Contract Balance checking"+err);
  });
/*
Checking if the account balance id zero, and transwering 100 ether from contract address
*/
  web3.eth.getBalance(req.session.userAddr).then((accntBalance)=>{
    console.log("Balance is "+accntBalance)

    if(web3.utils.fromWei(accntBalance,'ether')<=1){
      CaseReg.methods.withdrowCoins(req.session.userAddr).send({from:ownerAddr,gas:6000000,value:web3.utils.toWei('100','ether')}).then((paidStatus)=>{
          console.log("100 ether transfered from Contract !!paid Status "+paidStatus);
      }).catch((err)=>{
          console.log("!!!IMPOERANT!!! Error when calling withdrowCoins [index router] "+err);
      })
    }

    if(req.session.superAdmin)
      data.superAdminPanel=true;
      data.balance = accntBalance;
      res.render('index', { title: 'Case Management',data:data });
    }).catch((err)=>{
      console.log("Error getting Balance account "+err);
    });

  
});




module.exports = router;
