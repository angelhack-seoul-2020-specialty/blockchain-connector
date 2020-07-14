const fs = require('fs');
const path = require('path');
const APP_ROOT_DIR = path.join(__dirname, '..');
const Caver = require('caver-js');
const secret = fs.readFileSync(path.join(APP_ROOT_DIR, '.secret.json'));
const parsedSecret = JSON.parse(secret);
const caver = new Caver(parsedSecret.baobab.url);

const metadataOfCoffeeGround = fs.readFileSync(path.join(APP_ROOT_DIR, 'metadata/CoffeeGround'));
const addressOfCoffeeGround = fs.readFileSync(path.join(APP_ROOT_DIR, 'metadata/addressOfCoffeeGround'), 'utf-8');
const abiOfCoffeeGround = JSON.parse(metadataOfCoffeeGround).abi;

const coffeeGround = new caver.klay.Contract(abiOfCoffeeGround, addressOfCoffeeGround);

module.exports = {
    coffeeGround: coffeeGround 
}