pragma solidity 0.6.9;

contract CoffeeGround {
  string public constant name = "CoffeeGround";
  mapping (string => uint) donation;
  function addDonation(string memory _cafeId, uint _amount) public {
    donation[_cafeId] += _amount;
    emit AddDonation(_cafeId, _amount);
  }
  function getDonation(string memory _cafeId) public view returns (uint) {
    return donation[_cafeId];
  }
  event AddDonation(string indexed cafeId, uint amount);
}