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

/* GET users listing. */
router.get('/',authCheck, function(req, res, next) {
  res.send('Public route');
});

//to add a police station.
router.get("/add-civilian",authCheck,function(req,res){
    res.render("addCivilian");
})

//this function will add a new account with given password adn enter an entity in policestation Contract
router.post("/add-civilian",authCheck,async function(req,res,next){
    //console.log(req.body);
    if(req.body.name!=""&& req.body.idNo!=""&& req.body.age!=""){
        CaseReg.methods.addCivilian(req.body.name,req.body.idType,req.body.idNo,req.body.age,"").send({from:req.session.userAddr,gas:6000000}).then((data)=>{
            console.log("setCivilian method Completed"+data);
        }).catch((err)=>{
            console.log("setCivilian !!!!ERROR!!! :"+err);
        })
        res.redirect("/?pa=success");
    }
})

module.exports = router;
