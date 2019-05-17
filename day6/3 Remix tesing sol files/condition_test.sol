pragma solidity ^0.5.0;
import "./condtion.sol";
import "remix_tests.sol"; // this import is automatically injected by Remix.

contract MyTest {
  conditional conobj;
  
  function beforeAll() public{
      conobj = new conditional();
  }


   function check1 () public {
       Assert.ok(conobj.inBetween(1), "Is it not in between");
   }
}