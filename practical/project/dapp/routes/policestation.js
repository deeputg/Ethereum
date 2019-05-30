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
            
            CaseReg.methods.setPoliceStation(data ,req.body.stationName).send({from:ownerAddr,gas:6000000}).then((stationDetails)=>{    
            }).catch((err)=>{
                console.log("!!!IMPOERANT!!! Error when calling setPoliceStationMethod [policestation router] "+err);
            })
            res.redirect("/?psa=success&addr="+data);
        }).catch(err2=>{
            res.send(err2);
        })
    }
})


router.get("/add-court",authCheck,function(req,res){

    res.render("addCourt");
})

//this function will add a new account with given password adn enter an entity in policestation Contract
router.post("/add-court",authCheck,async function(req,res,next){
    //console.log(req.body);
    if(req.body.name!=""&&req.body){
        CaseReg.methods.addCourt(req.body.name,req.body.courtType,req.body.hierarchi,req.body.judgeName).send({from:req.session.userAddr,gas:6000000}).then((data)=>{
            console.log("addCourt method Completed"+data);
        }).catch((err)=>{
            console.log("addCourt !!!!ERROR!!! :"+err);
        })
        res.redirect("/?ca=success");
    }
    else{
        res.redirect("/policestation/add-officer?status=fail&reason=validation");
    }
})

router.get("/add-officer",authCheck,function(req,res){
    res.render("addOfficer");
})

//this function will add a new account with given password adn enter an entity in policestation Contract
router.post("/add-officer",authCheck,async function(req,res,next){
    //console.log(req.body);
    if(req.body.name!=""){
        CaseReg.methods.setOfficer(req.body.name,req.body.rank).send({from:req.session.userAddr,gas:6000000}).then((data)=>{
            console.log("serOffer method Completed"+data);
        }).catch((err)=>{
            console.log("serOffer !!!!ERROR!!! :"+err);
        })
        res.redirect("/?oa=success");
    }
    else{
        res.redirect("/policestation/add-officer?status=fail&reason=validation");
    }
})

module.exports = router;
