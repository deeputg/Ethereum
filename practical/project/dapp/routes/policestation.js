var express = require('express');
const util = require('util')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Police station route');
});

//to add a police station.
router.get("/add",function(req,res){
    res.render("addPoliceStation");
})

//this function will add a new account with given password adn enter an entity in policestation Contract
router.post("/add",async function(req,res){
    //console.log(req.body);
    if(req.body.stationPassword!=""&& req.body.stationName!=""){
        web3.eth.personal.newAccount(req.body.stationPassword).then((data)=>{
            
            CaseReg.methods.setPoliceStation(data.toLowerCase(),req.body.stationName).send({from:ownerAddr,gas:6000000}).then((stationDetails)=>{
                res.redirect("/?psa=success&addr="+data);
            }).catch((err)=>{
                res.send(err);
            })
        }).catch(err2=>{
            res.send(err2);
        })
    }
})

module.exports = router;
