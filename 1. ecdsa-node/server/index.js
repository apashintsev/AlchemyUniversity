const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

/*
private key:  4e6d1f06672a9e73266aea2bbaa9b6a7c673c58e85178641a20f95558da6f984
public key:  04d3124b999061acd1ec3789852ef853ae4b57cedcf0c948fdd18160048b1e091bb5e1405af2fdb1f40d4c19b1bed5c653f0aacf08d81c4eb06522450cfee8c517
Address:  5355da7cdedd12d8d96d10662b458d15ccf4d765

private key:  e6e6eb57915b3cf2df2458efbcca491c541ff6cc5e6ea3fd61d036a594772617
public key:  0450089563a076adf22e1ff1011cf773228b53a6cbce575fd5d1c110d4723d691ef14911679fa9e84cad0cb9e2894253b0782c1a0bba57b28ef356446610517343
Address:  511ca5f7764f7f2a6bd8ff0f588f216f5ba9c782

private key:  8c78a4e511fb1df73ad0831f539160794b7f1a9f4258ba5e528b48b8ccf73440
public key:  045b271c8afdb7a68efe1fc4ba8f88e18987528918e8319e6f68a9d004df2f04defcbb422d332614df24d65e0c34fc275a07d5f07e58706439df553fc24a8c6f2c
Address:  ed33430c40fc775780972a7730944bb386a1b741

*/

const balances = {
  "0x5355da7cdedd12d8d96d10662b458d15ccf4d765": 100,
  "0x511ca5f7764f7f2a6bd8ff0f588f216f5ba9c782": 50,
  "0xed33430c40fc775780972a7730944bb386a1b741": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, recoveryBit } = req.body;

  const messageHash = keccak256(utf8ToBytes(recipient + amount));
  const uintSignature = Uint8Array.from(Object.values(signature));
  const recoveredPublicKey = secp.recoverPublicKey(
    messageHash,
    uintSignature,
    recoveryBit
  );
  const recoveredAddress = "0x" + toHex(getEthAddress(recoveredPublicKey));

  if (recoveredAddress != sender)
    res.status(400).send({ message: "Not an owner" });

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}

async function recoverKey(message, signature, recoveryBit) {
  return secp.recoverPublicKey(hashMessage(message), signature, recoveryBit);
}

function getEthAddress(publicKey) {
  const withoutFirstByte = publicKey.slice(1);
  const hash = keccak256(withoutFirstByte);
  return hash.slice(hash.length - 20);
}
