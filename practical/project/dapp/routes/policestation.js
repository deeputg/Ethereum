var express = require('express');
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
router.post("/add",function(req,res){
    //console.log(req.body);
    if(req.body.stationPassword!=""&& req.body.stationName!=""){
        web3.eth.personal.newAccount(req.body.stationPassword).then((data)=>{
            console.log(data);
            CaseReg.methods.setPoliceStation(data).send().then((stationDetails)=>{
                console.log(stationDetails)
                res.send(stationDetails);
            })
        });
    }
})

module.exports = router;
