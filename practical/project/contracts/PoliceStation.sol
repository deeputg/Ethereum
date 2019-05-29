pragma solidity ^0.5.0;
//pragma experimental ABIEncoderV2;

contract PoliceStation{
    
    struct stationDetails{
        uint stationNo;
        string stationName;
        address stationAccAddress;
    }
   
    mapping (address=>stationDetails) station;
    uint stationNo=0;
    
    function setPoliceStation(address _address,string memory _stationName)public returns(address){
        station[_address] = stationDetails(stationNo,_stationName,_address);
        stationNo++;
        return _address;
    }
    
    function getStationDetails(address _address) public view returns(address,uint,string memory){
        stationDetails memory sd = station[_address];
        return(sd.stationAccAddress,sd.stationNo,sd.stationName);
    }
    
    enum ranks{pc,hc,asi,si,ci,dsp,sp,dig,ig,adgp,dgp,dgpChief}
    uint public officerId = 0;
    struct officerDetails{
        uint id;
        string name;
        ranks rank;
    }
    mapping (uint=>officerDetails) officerReg;
    
    function setOfficer(string memory _name,ranks _rank)public {
        officerReg[officerId] = officerDetails(officerId,_name,_rank);
        officerId++;
    }
    
    function getOficerDetails(uint _id) public view returns(uint,string memory,ranks){
        officerDetails memory od = officerReg[_id];
        return(od.id,od.name,od.rank);
    }
}