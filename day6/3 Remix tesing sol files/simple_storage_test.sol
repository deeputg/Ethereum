pragma solidity ^0.5.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
import "./simplestorage.sol";

contract MyTest {
  SimpleStorage foo;
  uint i = 0;
  
  function beforeAll() public{
      foo = new SimpleStorage();
  }

  function beforeEach() public{
    if (i == 1) {
      foo.set(100);
    }
    else if (i == 0) {
        foo.set(200);
    }
  }
  
   function check1 () public {
       Assert.equal(foo.get(), uint(100), "is return of get() = 100?");
   }
   
   function check2 () public view returns(bool) {
       // is return of get() = 200?
       return foo.get() == 200;
   }
   
   function check5 () public {
       Assert.notEqual(foo.get(), uint(200), "is return of get() != 200?");
   }   
   
   function check6 () public {
       Assert.greaterThan(foo.get(), uint(100), "is return of get() > 100?");
   }
   
   function check4 () public {
       Assert.lesserThan(foo.get(), uint(300), "is return of get() < 300?");
   }
}
