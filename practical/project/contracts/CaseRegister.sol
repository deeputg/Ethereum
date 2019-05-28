pragma solidity ^0.5.0;

import "./PoliceStation.sol";

contract CaseRegister is PoliceStation{
    
    enum CaseStatus {active,inactive}
    enum CaseCategory {criminal,petty,civil}
    
    struct caseDetails{
        uint caseNo;
        string caseName;
        CaseCategory caseCategory;
        string FIR;
        //string firFile;
        uint caseFileNo;
        uint[] petitioners;// array of petiioner id
        uint courtId;
        CaseStatus status; 
        
    }
    uint[] coinsHistoryCoinBase;

    mapping(uint=>caseDetails) caseReg;//mapping case number with the case details struct
    
    function newCase(uint _caseNo,string memory _caseName,CaseCategory _caseCategory,uint _caseFileNo,string memory _fir,uint[] memory _petetioners,uint _courtId,CaseStatus _status) public{
        caseReg[_caseNo]=caseDetails(_caseNo,_caseName,_caseCategory,_fir,_caseFileNo,_petetioners,_courtId,_status);
    }
    
    function getCaseDetails(uint _caseNo) public view returns(uint,string memory,CaseCategory,string memory,uint,uint[] memory,uint,CaseStatus){
        caseDetails memory cd = caseReg[_caseNo];
        return (cd.caseNo,cd.caseName,cd.caseCategory,cd.FIR,cd.caseFileNo,cd.petitioners,cd.courtId,cd.status);
    }
    
    function allocateCoins() public payable returns(bool){
        coinsHistoryCoinBase.push(msg.value);
        return true;
    }
    
    function withdrowCoins(address payable _address)public payable returns(bool){
        _address.transfer(msg.value);
    }
    
}
