const { keccak256 } = require("ethereum-cryptography/keccak");

function getEthAddress(publicKey) {
  const withoutFirstByte = publicKey.slice(1);
  const hash = keccak256(withoutFirstByte);
  return hash.slice(hash.length - 20);
}

module.exports = getEthAddress;
