'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './style.css';

const Home = () => {
    const [address, setAddress] = useState("sdfgh");
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
    const createContract = async (e) => {
        e.preventDefault();
        if (address != 0) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
            // await contractInstance.func();
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
                            <div>
                                <div></div>
                                <div>
                                    <form>
                                        <h1>Create Account</h1>
                                        <input type="number" placeholder="Enter Price" />
                                        <input type="number" placeholder="Enter Area" />
                                        <input type="text" placeholder="Enter Address" />
                                        <input type="text" placeholder="Enter Blockchain Address of Buyer" />
                                        <button onClick={(e) => { createContract(e) }}>Create Contract</button>
                                    </form>
                                </div>
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
            </div>
        </>
    )
}

export default Home;