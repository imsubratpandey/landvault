"use client";
import { useState } from "react";
import { ethers } from "ethers";
import "./style.css";
import axios from "axios";
import SmartContractJSON from "../../../../smart contracts/artifacts/contracts/SmartContract.sol/SmartContract.json";
const contractAbi = SmartContractJSON.abi;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const Home = () => {
  const [file, setFile] = useState(null);
  const [loaderState, setLoaderState] = useState("loader-hidden");
  const [errorState, setErrorState] = useState(false);
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [landAddress, setLandAddress] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [displayId, setDisplayId] = useState(0);
  const [pendingContracts, setPendingContracts] = useState([]);
  const [recievedContracts, setRecievedContracts] = useState([]);
  const [historyContracts, setHistoryContracts] = useState([]);
  const connectMetamask = async (e) => {
    e.preventDefault();
    setLoaderState("loader-visible");
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      setAddress(await signer.getAddress());
    } catch (err) {
      setErrorState(true);
      console.log(err);
    }
    setLoaderState("loader-hidden");
  }
  const uploadToPinata = async () => {
    setMessage("Uploading file to IPFS");
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data.path;
      } catch (error) {
        setErrorState(true);
        console.error(error);
      }
    }
  };
  const createContract = async (e) => {
    e.preventDefault();
    setLoaderState("loader-visible");
    if (address != 0) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const ipfsLink = (file) ? `https://gateway.pinata.cloud/ipfs/${await uploadToPinata()}` : ``;
      setMessage("Creating Contract");
      await contractInstance.list(landAddress, price, area, ipfsLink, buyerAddress).then((tx) => {
        tx.wait().then(() => {
          console.log("Transfer Successful!");
        }).catch((error) => {
          setErrorState(true);
          console.error(error);
        })
      });
    }
    else {
      setErrorState(true);
    }
    setMessage("Reading Contracts");
    await getPendingContract();
    setDisplayId(1);
    setLoaderState("loader-hidden");
    setMessage("");
  }
  const getPendingContract = async () => {
    setLoaderState("loader-visible");
    if (address != 0) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const result = await contractInstance.getAllPendingTransaction();
      setPendingContracts(result);
    }
    else {
      setErrorState(true);
      console.error(error);
    }
    setLoaderState("loader-hidden");
  }
  const getRecievedContract = async () => {
    setLoaderState("loader-visible");
    if (address != 0) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const result = await contractInstance.getAllReceivedTransaction();
      setRecievedContracts(result);
    }
    else {
      setErrorState(true);
      console.error(error);
    }
    setLoaderState("loader-hidden");
  }
  const getHistoryContract = async () => {
    setLoaderState("loader-visible");
    if (address != 0) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      const result = await contractInstance.getCompletedTransaction();
      setHistoryContracts(result);
    }
    else {
      setErrorState(true);
      console.error(error);
    }
    setLoaderState("loader-hidden");
  }
  const verifyByBuyer = async (id) => {
    setLoaderState("loader-visible");
    if (address != 0) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      await contractInstance.verifyByBuyer(id).then((tx) => {
        tx.wait().then(async () => {
          await getRecievedContract();
          console.log("Transfer Successful!");
        }).catch((error) => {
          setErrorState(true);
          console.error(error);
        })
      });
    }
    else {
      setErrorState(true);
      console.error(error);
    }
    setLoaderState("loader-hidden");
  }
  return (
    <>
      <div className="home-page-container-disabled-message">
        Only desktop devices are supported.
      </div>
      {
        (errorState) ?
          <div className="error-message">
            <h1>Something went wrong</h1>
            <button className="error-button" onClick={() => window.location.reload()}>Reload</button>
          </div>
          :
          <>
          </>
      }
      <div className={loaderState}>
        <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="12" r="3"><animate id="spinner_qFRN" begin="0;spinner_OcgL.end+0.25s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" /></circle><circle cx="12" cy="12" r="3"><animate begin="spinner_qFRN.begin+0.1s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" /></circle><circle cx="20" cy="12" r="3"><animate id="spinner_OcgL" begin="spinner_qFRN.begin+0.2s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" /></circle></svg>
        <h1>{message}</h1>
      </div>
      <div className="container" id="container">
        {
          (address) ?
            <>
              <div className="top-bar">
                <h1 className="main-title">LandValut</h1>
                <h3 className="account-detail" onClick={() => { navigator.clipboard.writeText(address); }}>Account Connected: {address.slice(0, 6) + "..." + address.slice(38, 42)}</h3>
              </div>
              <div className="contract-manager">
                {
                  (displayId === 0) ?
                    <>
                      <div className="contract-window">
                        <form className="contract-form">
                          <h1 className="contract-create-title">Create New Contract</h1>
                          <input type="text" value={landAddress} onChange={(e) => setLandAddress(e.target.value)} placeholder="Enter Address" />
                          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price in Rupees" />
                          <input type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Enter Area in Square. Meter" />
                          <input type="text" value={buyerAddress} onChange={(e) => setBuyerAddress(e.target.value)} placeholder="Enter Blockchain Address of Buyer" />
                          <input id="file-input" type="file" onChange={(e) => setFile(e.target.files[0])} />
                          <label htmlFor="file-input" className="custom-file-upload">{(file?.name) ? file.name : "Select Files to Upload"}</label>
                          <button onClick={(e) => { createContract(e) }}>Create Contract</button>
                        </form>
                      </div>
                    </>
                    :
                    <>
                      {
                        (displayId === 1) ?
                          <>
                            {
                              pendingContracts.length ?
                                <>
                                  {
                                    pendingContracts.map((el, i) => {
                                      return (
                                        <div className="pendcon" key={i}>
                                          <div className="contract-info">
                                            <h2>{el.sellerAddress.slice(0, 6) + "..." + el.sellerAddress.slice(38, 42)} → {el.buyerAddress.slice(0, 6) + "..." + el.buyerAddress.slice(38, 42)}</h2>
                                            <h2>GLOBAL CONTRACT ID : {el.id.toString()}</h2>
                                          </div>
                                          <div className="contract-details">
                                            <div className="contract-address"> 𖡡 {el.addressOfTheLand}</div>
                                            <div className="contract-price"> ₹ {el.priceOfLand.toString()}</div>
                                            <div className="contract-area">{el.areaOfTheLand.toString()} m<sup>2</sup></div>
                                            <div className="contract-ipfs" onClick={() => window.open(el.ipfsLink, "_blank")}>IPFS Documents ↪</div>
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
                          :
                          <>
                            {
                              (displayId === 2) ?
                                <>
                                  {
                                    recievedContracts.length ?
                                      <>
                                        {
                                          recievedContracts.map((el, i) => {
                                            return (
                                              <div className="pendcon" key={i}>
                                                <div className="contract-info">
                                                  <h2>{el.sellerAddress.slice(0, 6) + "..." + el.sellerAddress.slice(38, 42)} → {el.buyerAddress.slice(0, 6) + "..." + el.buyerAddress.slice(38, 42)}</h2>
                                                  <h2>GLOBAL CONTRACT ID : {el.id.toString()}</h2>
                                                </div>
                                                <div className="contract-details-cover">
                                                  <div className="contract-details-r">
                                                    <div className="contract-address"> 𖡡 {el.addressOfTheLand}</div>
                                                    <div className="contract-price"> ₹ {el.priceOfLand.toString()}</div>
                                                    <div className="contract-area">{el.areaOfTheLand.toString()} m<sup>2</sup></div>
                                                    <div className="contract-ipfs" onClick={() => window.open(el.ipfsLink, "_blank")}>IPFS Documents ↪</div>
                                                    <div className="contract-v">Verified By Seller ✓</div>
                                                  </div>
                                                  <div className="accept-button" onClick={() => { verifyByBuyer(el.id.toString()); }}>Accept this Contract ✓</div>
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
                                                  <h2>{el.sellerAddress.slice(0, 6) + "..." + el.sellerAddress.slice(38, 42)} → {el.buyerAddress.slice(0, 6) + "..." + el.buyerAddress.slice(38, 42)}</h2>
                                                  <h2>GLOBAL CONTRACT ID : {el.id.toString()}</h2>
                                                </div>
                                                <div className="contract-details">
                                                  <div className="contract-address"> 𖡡 {el.addressOfTheLand}</div>
                                                  <div className="contract-price"> ₹ {el.priceOfLand.toString()}</div>
                                                  <div className="contract-area">{el.areaOfTheLand.toString()} m<sup>2</sup></div>
                                                  <div className="contract-ipfs" onClick={() => window.open(el.ipfsLink, "_blank")}>IPFS Documents ↪</div>
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
                          </>
                      }
                    </>
                }
              </div>
              <div className="navigator">
                <a className={`${displayId === 0 ? "nav-selected" : "navigator-items"}`} onClick={() => setDisplayId(0)}>Create Contract</a>
                <a className={`${displayId === 1 ? "nav-selected" : "navigator-items"}`} onClick={async () => { await getPendingContract(); setDisplayId(1); }}>Pending Contract(s)</a>
                <a className={`${displayId === 2 ? "nav-selected" : "navigator-items"}`} onClick={async () => { await getRecievedContract(); setDisplayId(2); }}>Recieved Contract(s)</a>
                <a className={`${displayId === 3 ? "nav-selected" : "navigator-items"}`} onClick={async () => { await getHistoryContract(); setDisplayId(3); }}>History Contract(s)</a>
              </div>
            </>
            :
            <>
              <div className="form-container sign-in">
                <form>
                  <h1>LandValut</h1>
                  <button onClick={(e) => connectMetamask(e)}>Login with Metamask</button>
                </form>
              </div>
            </>
        }
      </div >
    </>
  )
}

export default Home;