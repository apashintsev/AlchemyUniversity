import secp from "ethereum-cryptography/secp256k1";
import utils from "ethereum-cryptography/utils";
import getEthAddress from "../utils/getEthAddress";
const privateKey = secp.utils.randomPrivateKey();

console.log("private key: ", utils.toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);
const publicKeyHex = utils.toHex(publicKey);
console.log("public key: ", publicKeyHex);

const addressHex = utils.toHex(getEthAddress(publicKey));

console.log("Address: ", addressHex);
