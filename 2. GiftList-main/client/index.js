const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");
const readline = require("readline");

const serverUrl = "http://localhost:1225";

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  readLine.question("What is your name? ", async (name) => {
    const tree = new MerkleTree(niceList);
    const index = niceList.findIndex((n) => n === name);
    const proof = tree.getProof(index);

    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      name: name,
      proof: proof,
    });

    console.log({ gift });

    readLine.close();
  });
}

main();
