pragma solidity ^0.5.0;

import "./PoliceStation.sol";
import "./Civilians.sol";
import "./Court.sol";

contract CaseRegister is PoliceStation,Civilians,Court{
    
    enum CaseStatus {active,inactive}
    enum CaseCategory {criminal,petty,civil}
    uint public caseNo = 0;
    uint public caseFileNo =0;
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
