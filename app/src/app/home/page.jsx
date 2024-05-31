'use client';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import './style.css';
const contractAddress = "0xa4c614ef79b770Bb253cAFB4B8a032c3B23Af935";
import axios from 'axios';
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

const Home = () => {
    const [loaderState, setLoaderState] = useState("loader-hidden");
    const [file, setFile] = useState("");
    const [address, setAddress] = useState("");
    const [landAddress, setLandAddress] = useState("");
    const [price, setPrice] = useState();
    const [area, setArea] = useState();
    const [buyerAddress, setBuyerAddress] = useState("");

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
    const handleSubmit = async () => {
        const fileData = new FormData();
        fileData.append("file", file);
        const responseData = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: fileData,
            headers: {
                pinata_api_key: "a4b35579f205d11186fc",
                pinata_secret_api_key: "b370d385da1c2e642f7173d018f51f63a40bdf063a1c0ed1493f903641b0573d",
                "Content-Type": "multipart/form-data",
            },
        });
        const fileUrl = "https://gateway.pinata.cloud/ipfs/" + responseData.data.IpfsHash;
        return fileUrl;
    }
    const createContract = async (e) => {
        e.preventDefault();
        if (address != 0) {
            var fileurl = await handleSubmit();
            console.log(fileurl);
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
            const result = await contractInstance.list(4, landAddress, price, area, address, buyerAddress, fileurl);
            console.log(result);
        }
        else {
            console.log("Please connect metamask first");
        }
    }
    const [pendingContracts, setPendingContracts] = useState([]);
    const getPendingContract = async () => {
        if (address != 0) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
            const result = await contractInstance.getAllPendingTranscationFromSeller(address);
            setPendingContracts(result);
        }
        else {
            console.log("Please connect metamask first");
        }
    }
    const [recievedContracts, setRecievedContracts] = useState();
    const getRecievedContract = async () => {
        if (address != 0) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
            const result = await contractInstance.getAllPendingTranscationFromBuyer(address);
            setRecievedContracts(result);
        }
        else {
            console.log("Please connect metamask first");
        }
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
                            <h1 className="account-detail" onClick={() => { navigator.clipboard.writeText(address); }}>Account Connected: {address.slice(0, 6) + '...' + address.slice(38, 42)}</h1>
                            <div className="navigator">
                                <a className='navigator-items' onClick={() => setDisplayId(0)}>Create Contract</a>
                                <a className='navigator-items' onClick={async () => { await getPendingContract(); setDisplayId(1); }}>Pending Contract</a>
                                <a className='navigator-items' onClick={async () => { await getRecievedContract(); setDisplayId(2); }}>Recieved Contract</a>
                            </div>
                            <div className="contract-manager">
                                {
                                    (displayId === 0) ?
                                        <>
                                            <div className="contract-window">
                                                <form>
                                                    <h1>Create New Contract</h1>
                                                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price in Rupees" />
                                                    <input type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Enter Area in sq. meter" />
                                                    <input type="text" value={landAddress} onChange={(e) => setLandAddress(e.target.value)} placeholder="Enter Address" />
                                                    <input type="text" value={buyerAddress} onChange={(e) => setBuyerAddress(e.target.value)} placeholder="Enter Blockchain Address of Buyer" />
                                                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
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
                                                                                    <button className='pend-cont-but'>
                                                                                        Waiting for Confirmation
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
                                                        {
                                                            recievedContracts.length ?
                                                                <>
                                                                    {
                                                                        recievedContracts.map((el, i) => {
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
                                                                                            const result = await contractInstance.verifyByBuyer(4);
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
                                            }
                                        </>
                                }
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