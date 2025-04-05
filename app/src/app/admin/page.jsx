"use client";
import { useState } from "react";
import { ethers } from "ethers";
import "./style.css";
import SmartContractJSON from "../../../../smart contracts/artifacts/contracts/SmartContract.sol/SmartContract.json";
const contractAbi = SmartContractJSON.abi;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const Admin = () => {
  const [loaderState, setLoaderState] = useState("loader-hidden");
  const [errorState, setErrorState] = useState(false);
  const [address, setAddress] = useState("");
  const [displayId, setDisplayId] = useState(0);
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
    } catch (error) {
      setErrorState(true);
      console.log(error);
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
      const result = await contractInstance.getAllReceivedTransactionAdmin();
      setRecievedContracts(result);
    }
    else {
      setErrorState(true);
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
      const result = await contractInstance.getAllCompletedTransactionAdmin();
      setHistoryContracts(result);
    }
    else {
      setErrorState(true);
    }
    setLoaderState("loader-hidden");
  }
  const verifyByGovt = async (id) => {
    setLoaderState("loader-visible");
    if (address != 0) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
      await contractInstance.verifyByGovt(id).then((tx) => {
        tx.wait().then(async () => {
          await getRecievedContract();
          console.log("Transfer Successful!");
        }).catch((error) => {
          console.log(error);
        })
      });
    }
    else {
      setErrorState(true);
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
      </div>
      <div className="container" id="container">
        {
          (address) ?
            <>
              <div className="top-bar">
                <h1 className="main-title" onClick={() => { navigator.clipboard.writeText(address); }}>LandValut</h1>
                <h3 className="account-detail" onClick={() => { navigator.clipboard.writeText(address); }}>Admin Panel: {address.slice(0, 6) + "..." + address.slice(38, 42)}</h3>
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