pragma solidity ^0.5.0;

contract CaseFile{
    uint public caseFileNo =0;
    uint public pageNumber =0;
    uint[][] public filePageRel;
    struct fileDetails{
        uint pageNumber;
        uint caseFileNo;
        string writeup;
        string image;
    }
    
    mapping(uint=>fileDetails) caseFileReg;
    
    function addCaseFilePage(string memory _writeup,string memory _image) public {
        caseFileReg[pageNumber]=fileDetails(pageNumber,caseFileNo,_writeup,_image);
        pageNumber++;
        filePageRel[caseFileNo].push(pageNumber);
    }
    
    function getCaseFilePage(uint _number)public view returns(uint,uint,string memory,string memory){
        fileDetails memory cd = caseFileReg[_number];
        return (cd.pageNumber,cd.caseFileNo,cd.writeup,cd.image);
    }
    
    
}
 