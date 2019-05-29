pragma solidity ^0.5.0;

contract Court{
    uint public courtId = 0;
    enum courtType{civil,criminal}
    enum hierarchi{TCMC,SCMC,FCMC,DistricCourt,DistrictFamilyCourt,Collector,BoardOfRevenue,HighCourt,SupremeCourt}
   
    struct courtDetails{
        uint courtId;
        string name;
        courtType court_type;
        hierarchi court_hierarchi;
        string judgeName;
    }
    
    mapping(uint=>courtDetails) courtReg;
    
    function addCourt(string memory _name,courtType _court_type,hierarchi _court_hierarchi,string memory _judgeName) public {
        courtReg[courtId]=courtDetails(courtId,_name,_court_type,_court_hierarchi,_judgeName);
        courtId++;
    }
    
    function getCourtDetails(uint _number)public view returns(uint,string memory,courtType,hierarchi,string memory){
        courtDetails memory cd = courtReg[_number];
        return (cd.courtId,cd.name,cd.court_type,cd.court_hierarchi,cd.judgeName);
    }
}