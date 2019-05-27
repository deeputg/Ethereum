pragma solidity ^0.5.0;
contract Auction {
  address public manager;
  address public seller;
  uint public latestBid;
  address payable public latestBidder;
 
  constructor() public  {
    manager = msg.sender;
  }
 
  function auction(uint bid) public payable {
    latestBid = bid * 1 ether; //1000000000000000000;
    seller = msg.sender;
  }

  function bid() public payable {
    require(msg.value > latestBid);
 
	if (latestBidder != address(0)) {
	  latestBidder.transfer(latestBid);
    }
    latestBidder = msg.sender;
    latestBid = msg.value;
  }
 
  function finishAuction() restricted public payable {
    msg.sender.transfer(address(this).balance);
  }
 	
  modifier restricted() {
    require(msg.sender == manager || msg.sender == seller);
    _;
  }
}
