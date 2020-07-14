const fs = require('fs');
const CoffeeGround = artifacts.require("./CoffeeGround.sol");

module.exports = function(deployer) {
  deployer.deploy(CoffeeGround, {overwrite: false}).then(() => {
    fs.writeFile(
      'metadata/CoffeeGround',
      JSON.stringify(CoffeeGround._json, 2), 
      (err) => {
        if (err) throw err 
        console.log();
        console.log(`-----------------------`);
        console.log(`The metadata of ${CoffeeGround._json.contractName} is recorded on metadata/CoffeeGround file.`);
      }
    );
    fs.writeFile(
      'metadata/addressOfCoffeeGround',
      CoffeeGround.address,
      (err) => {
        if (err) throw err 
        console.log(`The deployed address of ${CoffeeGround._json.contractName} is recorded on metadata/addressOfCoffeeGround file.`);
        console.log(`-----------------------`);
      }
    )
  })
};