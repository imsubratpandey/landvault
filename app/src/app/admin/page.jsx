'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './style.css';
const contractAddress = "0xa4c614ef79b770Bb253cAFB4B8a032c3B23Af935";

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
                        "internalType": "string",
                        "name": "landImage",
                        "type": "string"
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
                        "internalType": "string",
                        "name": "landImage",
                        "type": "string"
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
                        "internalType": "string",
                        "name": "landImage",
                        "type": "string"
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
                "internalType": "string",
                "name": "landImage",
                "type": "string"
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
            },
            {
                "internalType": "string",
                "name": "_landImage",
                "type": "string"
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
                "internalType": "string",
                "name": "landImage",
                "type": "string"
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
                "internalType": "string",
                "name": "landImage",
                "type": "string"
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
    const [pendingtxn, setPendingTxn] = useState([]);
    const getRecievedContract = async () => {
        if (address != 0) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
            const result = await contractInstance.getAllPendingTranscationFromGovt();
            setPendingTxn(result);
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
                            </div>
                            <div className="contract-manager">
                                {
                                    (displayId === 0) ?
                                        <>
                                            {
                                                pendingtxn.length ?
                                                    <>
                                                        {
                                                            pendingtxn.map((el, i) => {
                                                                return (
                                                                    <div className='pendcon' key={i}>
                                                                        <div>
                                                                            <table>
                                                                                <tr>
                                                                                    <thead>Address of Land:</thead>
                                                                                    <td>{el[1]}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <thead>Price of Land:</thead>
                                                                                    <td>{el[2].toString()} Rupees</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <thead>Area of Land:</thead>
                                                                                    <td>{el[3].toString()} square meter</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <thead>Seller Address of Land:</thead>
                                                                                    <td>{el[4]}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <thead>Buyer Address of Land:</thead>
                                                                                    <td> {el[5]}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <thead>Documents:</thead>
                                                                                    <td><a href={el[6].toString()} target='_blank'>Link To Document</a></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <thead>Verified from Seller:</thead>
                                                                                    <td>{el[7].toString()}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <thead>Verified from Buyer:</thead>
                                                                                    <td>{el[8].toString()}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <thead>Verified from Government:</thead>
                                                                                    <td>{el[9].toString()}</td>
                                                                                </tr>
                                                                            </table>
                                                                        </div>
                                                                        <button className='pend-cont-but-2' onClick={async () => {
                                                                            if (address != 0) {
                                                                                const provider = new ethers.BrowserProvider(window.ethereum);
                                                                                await provider.send("eth_requestAccounts", []);
                                                                                const signer = await provider.getSigner();
                                                                                const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
                                                                                const result = await contractInstance.verifyByGovt(4);
                                                                                console.log(result);
                                                                            }
                                                                            else {
                                                                                console.log("Please connect metamask first");
                                                                            }
                                                                        }}>
                                                                            Confirm
                                                                        </button>
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </>
                                                    :
                                                    <>
                                                        No Contract To Show
                                                    </>
                                            }
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