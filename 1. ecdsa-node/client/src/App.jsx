import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} />
<br/>
      <div>
        <h1>Test data:</h1>
        <h2>Address: 0x5355da7cdedd12d8d96d10662b458d15ccf4d765 </h2>
        <h2>Private key:</h2>
        4e6d1f06672a9e73266aea2bbaa9b6a7c673c58e85178641a20f95558da6f984
        <hr />
        <h2>Address: 0x511ca5f7764f7f2a6bd8ff0f588f216f5ba9c782 </h2>
        <h2>Private key:</h2>
        e6e6eb57915b3cf2df2458efbcca491c541ff6cc5e6ea3fd61d036a594772617
        <hr />
        <h2>Address: ed33430c40fc775780972a7730944bb386a1b741</h2>
        <h2>Private key:</h2> private key:
        8c78a4e511fb1df73ad0831f539160794b7f1a9f4258ba5e528b48b8ccf73440
      </div>
    </div>
  );
}

export default App;
