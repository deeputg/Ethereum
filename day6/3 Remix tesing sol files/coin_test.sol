pragma solidity ^0.5.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "./coin.sol";

contract MyTest {
  KCoin conobj;
  
  function beforeAll() public{
      conobj = new KCoin();
  }


   function check1 () public {
       Assert.equal(conobj.getBalance(tx.origin), uint(10000), "The owner has 1000 MetaCoin initially");
   }
}
