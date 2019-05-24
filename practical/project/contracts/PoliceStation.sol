pragma solidity ^0.5.0;
//pragma experimental ABIEncoderV2;

contract PoliceStation{
    
    struct stationDetails{
        uint stationNo;
        string stationName;
        address stationAccAddress;
    }
   
    mapping (address=>stationDetails) station;
    uint stationNo=1;
    
    
    function setPoliceStation(address _address,string memory _stationName)public{
        station[_address] = stationDetails(stationNo,_stationName,_address);
        stationNo++;
    }
    
    function getStationDetails(address _address) public view returns(address,uint,string memory){
        stationDetails memory sd = station[_address];
        return(sd.stationAccAddress,sd.stationNo,sd.stationName);
    }
    
}