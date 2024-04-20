'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './style.css';

const Home = () => {
    const [address, setAddress] = useState("");
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
    return (
        <>
            <div className="container" id="container">
                <div className="form-container sign-in">
                    <form>
                        <h1>Sign In</h1>
                        <button onClick={(e) => connectMetamask(e)}>Login with Metamask</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Home;