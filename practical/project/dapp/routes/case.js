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
  res.send('Case route');
});

//to add a police station.
router.get("/register",authCheck,function(req,res){
    caseData = new Array();
    caseData.push(CaseReg.methods.civilianNumber().call({from:req.session.userAddr}))
    caseData.push(CaseReg.methods.courtId().call({from:req.session.userAddr}))
    caseData.push(CaseReg.methods.officerId().call({from:req.session.userAddr}))

    Promise.all(caseData).then((values)=>{
        civilianCount = parseInt(web3.utils.toBN(values[0]).toString())
        courtCount = parseInt(web3.utils.toBN(values[1]).toString())
        officerCount = parseInt(web3.utils.toBN(values[2]).toString())
        civilianData = new Array();
        courtData = new Array();
        officerData = new Array();
        for(let i=0;i<civilianCount;i++){
            civilianData.push(CaseReg.methods.getCivilian(i).call({from:req.session.userAddr,gas:6000000}));
        }
        for(let i=0;i<courtCount;i++){
            courtData.push(CaseReg.methods.getCourtDetails(i).call({from:req.session.userAddr,gas:6000000}));
        }
        for(let i=0;i<officerCount;i++){
            officerData.push(CaseReg.methods.getOficerDetails(i).call({from:req.session.userAddr,gas:6000000}));
        }

        Promise.all(civilianData).then((result)=>{
            Promise.all(courtData).then(result1=>{
                Promise.all(officerData).then(result2=>{
                    res.render("registerCase",{civilianData:result,courtData:result1,officerData:result2} );
                })
            })
        })
    }).catch(err=>{
        console.log("!ERROR!!! when calling promise all of count "+err);
       // res.redirect("/?stat=fail")
        
    })
        
        
})

//this function will add a new account with given password adn enter an entity in policestation Contract
router.post("/register",authCheck,async function(req,res,next){
    if(!Array.isArray(req.body.petitioner))
        var petetioners = [req.body.petitioner];
    else
        var petetioners = req.body.petitioner;
    if(!Array.isArray(req.body.accused))
        var accused = [req.body.accused];
    else
        var accused = req.body.accused;

    if(req.body.name!=""&&req.body.fir!=""&&req.body.petetioners!=""&&req.body.accused!=""){

        CaseReg.methods.newCase(req.body.name,req.body.caseCategory,req.body.fir, petetioners,accused,req.body.court,req.body.officer,0).send({from:req.session.userAddr,gas:6000000}).then((data)=>{
            console.log("newCase method Completed"+data);
        }).catch((err)=>{
            console.log("newCase !!!!ERROR!!! :"+err);
        })
        res.redirect("/?caseadd=success");
    }
    else{
        res.redirect("/case/register?status=fail&reason=validation");
    }
})

//to add a police station.
router.get("/browse",authCheck,function(req,res){
    caseData = new Array();
    caseData.push(CaseReg.methods.civilianNumber().call({from:req.session.userAddr}))
    caseData.push(CaseReg.methods.courtId().call({from:req.session.userAddr}))
    caseData.push(CaseReg.methods.officerId().call({from:req.session.userAddr}))
    caseData.push(CaseReg.methods.caseNo().call({from:req.session.caseNo}))

    Promise.all(caseData).then((values)=>{
        civilianCount = parseInt(web3.utils.toBN(values[0]).toString())
        courtCount = parseInt(web3.utils.toBN(values[1]).toString())
        officerCount = parseInt(web3.utils.toBN(values[2]).toString())
        caseCount = parseInt(web3.utils.toBN(values[3]).toString())
        
        civilianData = new Array();
        courtData = new Array();
        officerData = new Array();
        caseData = new Array();

        for(let i=0;i<civilianCount;i++){
            civilianData.push(CaseReg.methods.getCivilian(i).call({from:req.session.userAddr,gas:6000000}));
        }
        for(let i=0;i<courtCount;i++){
            courtData.push(CaseReg.methods.getCourtDetails(i).call({from:req.session.userAddr,gas:6000000}));
        }
        for(let i=0;i<officerCount;i++){
            officerData.push(CaseReg.methods.getOficerDetails(i).call({from:req.session.userAddr,gas:6000000}));
        }
        for(let i=0;i<caseCount;i++){
            console.log("counttttttttttttttttttttttttttttttttttttttttt");
            
            caseData.push(CaseReg.methods.getCaseDetails(i).call({from:req.session.userAddr,gas:6000000}));
        }

        Promise.all(civilianData).then((result)=>{
            Promise.all(courtData).then(result1=>{
                Promise.all(officerData).then(result2=>{
                    Promise.all(caseData).then(result3=>{
                        res.render("browseCase",{civilianData:result,courtData:result1,officerData:result2,caseData:result3} );
                    })                })
            })
        })
    }).catch(err=>{
        console.log("!ERROR!!! when calling promise all of count "+err);
       // res.redirect("/?stat=fail")
        
    })
        
        
})

//to add a police station.
router.get("/caseDetails/:id",authCheck,function(req,res){
    caseData = new Array();
    caseData.push(CaseReg.methods.civilianNumber().call({from:req.session.userAddr}))
    caseData.push(CaseReg.methods.courtId().call({from:req.session.userAddr}))
    caseData.push(CaseReg.methods.officerId().call({from:req.session.userAddr}))

    Promise.all(caseData).then((values)=>{
        civilianCount = parseInt(web3.utils.toBN(values[0]).toString())
        courtCount = parseInt(web3.utils.toBN(values[1]).toString())
        officerCount = parseInt(web3.utils.toBN(values[2]).toString())
        
        civilianData = new Array();
        courtData = new Array();
        officerData = new Array();

        for(let i=0;i<civilianCount;i++){
            civilianData.push(CaseReg.methods.getCivilian(i).call({from:req.session.userAddr,gas:6000000}));
        }
        for(let i=0;i<courtCount;i++){
            courtData.push(CaseReg.methods.getCourtDetails(i).call({from:req.session.userAddr,gas:6000000}));
        }
        for(let i=0;i<officerCount;i++){
            officerData.push(CaseReg.methods.getOficerDetails(i).call({from:req.session.userAddr,gas:6000000}));
        }

        caseData.push(CaseReg.methods.getCaseDetails(req.params.id).call({from:req.session.userAddr,gas:6000000}));

        Promise.all(civilianData).then((result)=>{
            Promise.all(courtData).then(result1=>{
                Promise.all(officerData).then(result2=>{
                    Promise.all(caseData).then(result3=>{
                        res.render("caseDetails",{civilianData:result,courtData:result1,officerData:result2,caseData:result3} );
                    })                })
            })
        })
    }).catch(err=>{
        console.log("!ERROR!!! when calling promise all of count "+err);
       // res.redirect("/?stat=fail")
        
    })
        
        
})

module.exports = router;
