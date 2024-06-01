'use client';
import { useState } from 'react';
import { ethers } from 'ethers';
import './style.css';
const contractAddress = "0x1fE6866C1a562030419d7d3A8FDfF93Bb02E5Ca0";
import axios from 'axios';
let contractAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "getAllCompletedTransactionAdmin",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "addressOfTheLand",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "priceOfLand",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "areaOfTheLand",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "sellerAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "buyerAddress",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isVerifiedByBuyer",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isVerifiedByGovt",
            "type": "bool"
          }
        ],
        "internalType": "struct SmartContract.Land[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllPendingTransaction",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "addressOfTheLand",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "priceOfLand",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "areaOfTheLand",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "sellerAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "buyerAddress",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isVerifiedByBuyer",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isVerifiedByGovt",
            "type": "bool"
          }
        ],
        "internalType": "struct SmartContract.Land[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllReceivedTransaction",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "addressOfTheLand",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "priceOfLand",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "areaOfTheLand",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "sellerAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "buyerAddress",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isVerifiedByBuyer",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isVerifiedByGovt",
            "type": "bool"
          }
        ],
        "internalType": "struct SmartContract.Land[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllReceivedTransactionAdmin",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "addressOfTheLand",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "priceOfLand",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "areaOfTheLand",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "sellerAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "buyerAddress",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isVerifiedByBuyer",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isVerifiedByGovt",
            "type": "bool"
          }
        ],
        "internalType": "struct SmartContract.Land[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCompletedTransaction",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "addressOfTheLand",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "priceOfLand",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "areaOfTheLand",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "sellerAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "buyerAddress",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isVerifiedByBuyer",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isVerifiedByGovt",
            "type": "bool"
          }
        ],
        "internalType": "struct SmartContract.Land[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "lands",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "addressOfTheLand",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "priceOfLand",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "areaOfTheLand",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "sellerAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "buyerAddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isVerifiedByBuyer",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isVerifiedByGovt",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_addressOfTheLand",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_priceOfLand",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_areaOfTheLand",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_buyerAddress",
        "type": "address"
      }
    ],
    "name": "list",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "verifyByBuyer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "verifyByGovt",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const Admin = () => {
  const [loaderState, setLoaderState] = useState("loader-hidden");
  const [address, setAddress] = useState("");
  const [displayId, setDisplayId] = useState(0);
  const connectMetamask = async (e) => {
    e.preventDefault();
    setLoaderState("loader-visible");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      setAddress(await signer.getAddress());
    } catch (err) {
      console.log(err);
    }
    setLoaderState("loader-hidden");
  }
  const [recievedContracts, setRecievedContracts] = useState([]);
  const getRecievedContract = async () => {
    console.log("rc running");
    setLoaderState("loader-visible");
    if (address != 0) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const result = await contractInstance.getAllReceivedTransactionAdmin();
      console.log(result);
      setRecievedContracts(result);
    }
    else {
      console.log("Please connect metamask first");
    }
    setLoaderState("loader-hidden");
  }
  const [historyContracts, setHistoryContracts] = useState([]);
  const getHistoryContract = async () => {
    console.log("hc running");
    setLoaderState("loader-visible");
    if (address != 0) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const result = await contractInstance.getAllCompletedTransactionAdmin();
      console.log(result);
      setHistoryContracts(result);
    }
    else {
      console.log("Please connect metamask first");
    }
    setLoaderState("loader-hidden");
  }
  const verifyByGovt = async (id) => {
    console.log("vfg running");
    setLoaderState("loader-visible");
    if (address != 0) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const result = await contractInstance.verifyByGovt(id).then((tx) => {
        tx.wait().then(async () => {
          await getRecievedContract();
          setLoaderState("loader-hidden")
          console.log("Transfer Successful!")
        }).catch((err) => {
          setLoaderState("loader-hidden")
          console.log("handleClick Error: ", err)
          console.log("Transfer Failed!")
        })
      });
      console.log(result);
    }
    else {
      console.log("Please connect metamask first");
    }
    //setLoaderState("loader-hidden");
  }
  return (
    <>
      <div className={loaderState}>
        <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="12" r="3"><animate id="spinner_qFRN" begin="0;spinner_OcgL.end+0.25s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" /></circle><circle cx="12" cy="12" r="3"><animate begin="spinner_qFRN.begin+0.1s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" /></circle><circle cx="20" cy="12" r="3"><animate id="spinner_OcgL" begin="spinner_qFRN.begin+0.2s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" /></circle></svg>
      </div>
      <div className="container" id="container">
        {
          (address) ?
            <>
              <div className="top-bar">
                <h1 className="main-title" onClick={() => { navigator.clipboard.writeText(address); }}>LandValut</h1>
                <h3 className="account-detail" onClick={() => { navigator.clipboard.writeText(address); }}>Admin Panel: {address.slice(0, 6) + '...' + address.slice(38, 42)}</h3>
              </div>
              <div className="contract-manager">
                {
                  (displayId === 0) ?
                    <>
                      {
                        recievedContracts.length ?
                          <>
                            {
                              recievedContracts.map((el, i) => {
                                return (
                                  <div className="pendcon" key={i}>
                                    <div className="contract-info">
                                      <h2>{el.sellerAddress.slice(0, 6) + '...' + el.sellerAddress.slice(38, 42)} → {el.buyerAddress.slice(0, 6) + '...' + el.buyerAddress.slice(38, 42)}</h2>
                                      <h2>GLOBAL CONTRACT ID : {el.id.toString()}</h2>
                                    </div>
                                    <div className="contract-details-cover">
                                      <div className="contract-details-r">
                                        <div className="contract-address"> 𖡡 {el.addressOfTheLand}</div>
                                        <div className="contract-price"> ₹ {el.priceOfLand.toString()}</div>
                                        <div className="contract-area">{el.areaOfTheLand.toString()} m<sup>2</sup></div>
                                        <div className="contract-ipfs">IPFS Documents ↪</div>
                                        <div className="contract-v">Verified By Seller ✓</div>
                                        <div className={el.isVerifiedByBuyer === true ? "contract-v" : "contract-nv"}>Verified By Buyer {el.isVerifiedByBuyer === true ? "✓" : " ✕"}</div>
                                      </div>
                                      <div className="accept-button" onClick={() => { verifyByGovt(el.id.toString()); }}>Accept this Contract ✓</div>
                                    </div>
                                  </div>
                                );
                              })
                            }
                          </>
                          :
                          <div className="empty-window">
                            No Contract To Show
                          </div>
                      }
                    </>
                    :
                    <>
                      {
                        historyContracts.length ?
                          <>
                            {
                              historyContracts.map((el, i) => {
                                return (
                                  <div className="pendcon" key={i}>
                                    <div className="contract-info">
                                      <h2>{el.sellerAddress.slice(0, 6) + '...' + el.sellerAddress.slice(38, 42)} → {el.buyerAddress.slice(0, 6) + '...' + el.buyerAddress.slice(38, 42)}</h2>
                                      <h2>GLOBAL CONTRACT ID : {el.id.toString()}</h2>
                                    </div>
                                    <div className="contract-details">
                                      <div className="contract-address"> 𖡡 {el.addressOfTheLand}</div>
                                      <div className="contract-price"> ₹ {el.priceOfLand.toString()}</div>
                                      <div className="contract-area">{el.areaOfTheLand.toString()} m<sup>2</sup></div>
                                      <div className="contract-ipfs">IPFS Documents ↪</div>
                                      <div className="contract-v">Verified By Seller ✓</div>
                                      <div className={el.isVerifiedByBuyer === true ? "contract-v" : "contract-nv"}>Verified By Buyer {el.isVerifiedByBuyer === true ? "✓" : " ✕"}</div>
                                      <div className={el.isVerifiedByGovt === true ? "contract-v" : "contract-nv"}>Verified By Governmet {el.isVerifiedByGovt === true ? "✓" : " ✕"}</div>
                                    </div>
                                  </div>
                                );
                              })
                            }
                          </>
                          :
                          <div className="empty-window">
                            No Contract To Show
                          </div>
                      }
                    </>
                }
              </div>
              <div className="navigator">
                <a className={`${displayId === 0 ? "nav-selected" : "navigator-items"}`} onClick={async () => { await getRecievedContract(); setDisplayId(0); }}>Recieved Contract(s)</a>
                <a className={`${displayId === 1 ? "nav-selected" : "navigator-items"}`} onClick={async () => { await getHistoryContract(); setDisplayId(1); }}>History Contract(s)</a>
              </div>
            </>
            :
            <>
              <div className="form-container sign-in">
                <form>
                  <h1>LandValut - Admin Panel</h1>
                  <button onClick={(e) => connectMetamask(e)}>Login with Metamask</button>
                </form>
              </div>
            </>
        }
      </div >
    </>
  )
}

export default Admin;