pragma solidity ^0.5.0;

import "./PoliceStation.sol";
import "./Civilians.sol";
import "./Court.sol";
import "./CaseFile.sol";



contract CaseRegister is PoliceStation,Civilians,Court,CaseFile{
    
    constructor() public {
    addCourt("Judicial First Class Court - Alappuzha",courtType(1),hierarchi(2),"Jameela");
    addCivilian("Deepu",idType(1),"123",25,"");
    addCivilian("Saji",idType(1),"126",25,"");
    addCivilian("Stanly",idType(1),"124",25,"");
    addCivilian("Rameshan",idType(1),"125",25,"");
    setOfficer("Bharath Chandran",ranks(5));
    }
    
    enum CaseStatus {active,inactive}
    enum CaseCategory {criminal,petty,civil}
    uint public caseNo = 0;
    struct caseDetails{
        uint caseNo;
        string caseName;
        CaseCategory caseCategory;
        string FIR;
        //string firFile;
        uint caseFileNo;
        uint[] petitioners;// array of petiioner id
        uint[] accused;
        uint courtId;
        uint officerId;
        CaseStatus status; 
        
    }
    uint[] coinsHistoryCoinBase;

    mapping(uint=>caseDetails) caseReg;//mapping case number with the case details struct
    
    function newCase(string memory _caseName,CaseCategory _caseCategory,string memory _fir,uint[] memory _petetioners,uint[] memory _accused,uint _courtId,uint _officerId,CaseStatus _status) public{
        caseReg[caseNo]=caseDetails(caseNo,_caseName,_caseCategory,_fir,caseFileNo,_petetioners,_accused,_courtId,_officerId,_status);
        caseNo++;
        caseFileNo++;
    }
    
    function getCaseDetails(uint _caseNo) public view returns(uint,string memory,CaseCategory,string memory,uint,uint[] memory,uint[] memory,uint,uint,CaseStatus){
        caseDetails memory cd = caseReg[_caseNo];
        return (cd.caseNo,cd.caseName,cd.caseCategory,cd.FIR,cd.caseFileNo,cd.petitioners,cd.accused,cd.courtId,cd.officerId,cd.status);
    }
    
    function allocateCoins() public payable returns(bool){
        coinsHistoryCoinBase.push(msg.value);
        return true;
    }
    
    function withdrowCoins(address payable _address)public payable returns(bool){
        _address.transfer(msg.value);
    }
    
}
