'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './style.css';
const contractAddress = "0x3C826f10dA41099E648e7aBBb53C977Aa12715bB";
let contractAbi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "addressOfLand",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "priceOfLand",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "areaOfLand",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "sellersAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "buyersAddress",
                "type": "address"
            }
        ],
        "name": "List",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "Tasks",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
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
        "name": "finishedTransaction",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "buyerAddress",
                "type": "address"
            }
        ],
        "name": "getAllPendingTranscationFromBuyer",
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
                        "name": "sellersAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "buyersAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "isVerifiedBySeller",
                        "type": "bool"
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
        "name": "getAllPendingTranscationFromGovt",
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
                        "name": "sellersAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "buyersAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "isVerifiedBySeller",
                        "type": "bool"
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
                "internalType": "address",
                "name": "sellerAddress",
                "type": "address"
            }
        ],
        "name": "getAllPendingTranscationFromSeller",
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
                        "name": "sellersAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "buyersAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "isVerifiedBySeller",
                        "type": "bool"
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
        "name": "items",
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
                "name": "sellersAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "buyersAddress",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "isVerifiedBySeller",
                "type": "bool"
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
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
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
                "name": "_sellersAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_buyersAddress",
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
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "taskAssociatedWithABuyer",
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
                "name": "sellersAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "buyersAddress",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "isVerifiedBySeller",
                "type": "bool"
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
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "taskAssociatedWithASeller",
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
                "name": "sellersAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "buyersAddress",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "isVerifiedBySeller",
                "type": "bool"
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

const Home = () => {
    const [address, setAddress] = useState("");
    const [landAddress, setLandAddress] = useState("");
    const [price, setPrice] = useState(0);
    const [area, setArea] = useState(0);
    const [buyerAddress, setBuyerAddress] = useState("");

    const [displayId, setDisplayId] = useState("");
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
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
            const result = await contractInstance.list(landAddress,price,area,address,buyerAddress);
            console.log(result);
        }
        else {
            console.log("Please connect metamask first");
        }
    }
    const getPendingContract = async () => {
        if (address != 0) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
            const result = await contractInstance.getAllPendingTranscationFromSeller(address);
            console.log(result);
        }
        else {
            console.log("Please connect metamask first");
        }
    }
    const getRecievedContract = async () => {
        if (address != 0) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
            const result = await contractInstance.getAllPendingTranscationFromBuyer(buyerAddress);
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
                                <a onClick={() => setDisplayId(0)}>Create Contract</a>
                                <a onClick={() => { getPendingContract(); setDisplayId(1); }}>Pending Contract</a>
                                <a onClick={() => { getRecievedContract(); setDisplayId(2); }}>Recieved Contract</a>
                            </div>
                            <div className="contract-manager">
                                {
                                    (displayId === 0) ?
                                        <>
                                            <div className="contract-window">
                                                <form>
                                                    <h1>Create New Contract</h1>
                                                    <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Enter Price" />
                                                    <input type="number" value={area} onChange={(e)=> setArea(e.target.value)} placeholder="Enter Area" />
                                                    <input type="text" value={landAddress} onChange={(e)=>setLandAddress(e.target.value)} placeholder="Enter Address" />
                                                    <input type="text" value={buyerAddress} onChange={(e)=>setBuyerAddress(e.target.value)} placeholder="Enter Blockchain Address of Buyer" />
                                                    <button onClick={(e) => { createContract(e) }}>Create Contract</button>
                                                </form>
                                            </div>
                                        </>
                                        :
                                        <>
                                            {
                                                (displayId === 1) ?
                                                    <>
                                                        <div></div>
                                                    </>
                                                    :
                                                    <>
                                                        <div></div>
                                                    </>
                                            }
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

export default Home;