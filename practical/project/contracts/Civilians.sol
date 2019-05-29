pragma solidity ^0.5.0;

contract Civilians{
    uint public civilianNumber = 0;
    enum idType{votersId,adharCard,drivingLicence}
    struct civilianDetails{
        uint civilianNo;
        string name;
        idType id;
        string idNumber;
        uint age;
        string pics;
    }
    
    mapping(uint=>civilianDetails) civilianReg;
    
    function addCivilian(string memory _name,idType _idType,string memory _id,uint _age,string memory _pics) public {
       // _pics = ;
        civilianReg[civilianNumber]=civilianDetails(civilianNumber,_name,_idType,_id,_age,_pics);
        civilianNumber++;
    }
    
    function getCivilian(uint _number)public view returns(uint,string memory,idType,string memory,uint,string memory){
        civilianDetails memory cd = civilianReg[_number];
        return (cd.civilianNo,cd.name,cd.id,cd.idNumber,cd.age,cd.pics);
    }
    
    
}