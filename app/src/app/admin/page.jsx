'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './style.css';

const Admin = () => {
    const [address, setAddress] = useState("");
    const [displayId, setDisplayId] = useState("1");
    const connectMetamask = async (e) => {
        e.preventDefault();
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            setAddress(await signer.getAddress());
        } catch (err) {
            console.log(err)
        }
    }
    const getRecievedContract = async () => {
        if (address != 0) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
            const result = await contractInstance.getAllPendingTranscationFromGovt();
            console.log(result);
        }
        else {
            console.log("Please connect metamask first");
        }
    }
    const getAllContract = async () => {
        if (address != 0) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
            const result = await contractInstance.getAllTranscationFromGovt();
            console.log(result);
        }
        
        else {
            console.log("Please connect metamask first");
        }
    }
    return (
        <>
            <div className="container" id="container">
                {
                    (address) ?
                        <>
                            <h1 className="account-detail">Account Connected: {address.slice(0, 6) + "..." + address.slice(38, 42)}</h1>
                            <div className="navigator">
                                <a className='navigator-items' onClick={() => { getRecievedContract(); setDisplayId(0); }}>Recieved Contract</a>
                                <a className='navigator-items' onClick={() => { getAllContract(); setDisplayId(1); }}>All Contract</a>
                            </div>
                            <div className="contract-manager">
                                {
                                    (displayId === 0) ?
                                        <>
                                        </>
                                        :
                                        <>
                                        </>
                                }
                            </div>
                        </>
                        :
                        <>
                            <div className="form-container sign-in">
                                <form>
                                    <h1>Sign In</h1>
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