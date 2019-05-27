pragma solidity ^0.5.0 ;

contract PayingFees{
    
    address managementAddress;
    mapping(uint => uint)  public  payments;
    
    event feesPaid(string message, uint amount);
    event feeWithdrawed(string message, uint amount);
     
    constructor() public {
        managementAddress = msg.sender;    
    }
    
    modifier onlyManagement{
        require(managementAddress == msg.sender);
        _;
    }
    
    modifier minimumBalance{
        require(address(this).balance > 0);
        _;
    }
    
    function feePayment(uint _roll) public payable {
        payments[_roll] += msg.value;
        emit feesPaid("Payment completed", msg.value);
    }
    
    function feeWithdraw() public onlyManagement minimumBalance {
        emit feeWithdrawed("Fees Withdrawed", address(this).balance);
        msg.sender.transfer(address(this).balance);
        emit feeWithdrawed("Balance in contract", address(this).balance);
    }
    
    function balance() public view onlyManagement returns(uint _balance) {
        _balance = address(this).balance;
    }
    
}

contract StudentManagementSystem is PayingFees {
    
    enum gender {male, female, other}
    
    struct profile {
        string name;
        uint age;
        bool indian;
        gender myGender;
    }
    
    mapping(uint => profile) student;
    
    function setStudent(uint _roll, string memory _name, uint _age, bool _indian, gender _myGender) public {
        student[_roll] = profile(_name, _age, _indian, _myGender);
    }
    
    function getStudent(uint _roll) public view returns (string memory _name, uint _age, bool _indian, gender _myGender){
        _name = student[_roll].name;
        _age = student[_roll].age;
        _indian = student[_roll].indian;
        _myGender = student[_roll].myGender;
    }
    
}