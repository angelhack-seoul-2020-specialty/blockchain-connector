const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParsre = require('body-parser');
const Caver = require('caver-js');

const port = 3000;
const app = express();

const APP_ROOT_DIR = path.join(__dirname);
const secret = fs.readFileSync(path.join(APP_ROOT_DIR, '.secret.json'));
const parsedSecret = JSON.parse(secret);
const caver = new Caver(parsedSecret.baobab.url);
const contract = require(path.join(APP_ROOT_DIR, 'config/contract'));
const GAS_LIMIT = 300000;

const coffeeGround = contract.coffeeGround;

const d = parsedSecret.baobab.accounts.deployer;
const deployer = caver.klay.accounts.wallet.add(d.privateKey);

app.use(bodyParsre.urlencoded({ extended: false }));
app.use(bodyParsre.json());

app.get('/coffee-ground/:cafeId', (req, res) => {
  cfid = req.params.cafeId;
  
  coffeeGround.methods.getDonation(
    caver.klay.abi.encodeParameter('string', cfid),
  ).call()
  .then((d) => {
    res.json({
      cafeId: cfid,
      totalDonation: d
    });
  })
  .catch((err) => {
    res.status(500).send(err);
  });
});

app.post('/coffee-ground', (req, res) => {
  cfid = req.body.cafeId;
  am = req.body.amount;

  const abiAddDonation = coffeeGround.methods.addDonation(
    caver.klay.abi.encodeParameter('string', cfid),
    caver.klay.abi.encodeParameter('uint', am)
  ).encodeABI();

  caver.klay.sendTransaction({
    type: 'SMART_CONTRACT_EXECUTION',
    from: deployer.address,
    to: coffeeGround._address,
    data: abiAddDonation,
    gas: GAS_LIMIT
  })
  .on('receipt', (receipt) => {
    bh = receipt.blockHash;
    th = receipt.transactionHash;
    caver.klay.getBlock(receipt.blockHash)
    .then((info) => {
      res.json({
        blkHash: bh,
        txHash: th,
        timestamp: info.timestamp
      });
    });
  })
  .on('error', (err) => {
    res.status(500).send(err);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});