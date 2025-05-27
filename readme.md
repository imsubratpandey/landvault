# LandVault

No more Land Frauds with LandVault

The project aims to create a decentralized platform that facilitates secure contract negotiation and signing between buyers and sellers, with the added feature of finalizing contracts through a government authority. Built on blockchain technology and powered by Next.js, the platform ensures transparency, immutability, and security throughout the contract lifecycle.

## Technologies Used

The smart contracts are written in Solidity. We used Hardhat to run them on a development network and finally deployed them on the Blockchain. We use these contracts to make implement logic and store data through ETH transactions.

To communicate from blockchain network, this application rely on the Metamask gateway. MetaMask is a software cryptocurrency wallet used to interact with the Ethereum blockchain. We used its browser extension to access the Ethereum wallet and interact with our application.

IPFS or InterPlanetary File System, is a peer-to-peer distributed file system that allows users to store and access files in a decentralized manner. Instead of relying on a central server, IPFS uses a distributed network of nodes to store and share files. We used IPFS to store user’s documents so the verifier or government can access them later and check whether it’s authentic or not.

## Working

There are three parties that are involve in a LandVault transactions: buyer, sender and government. To make a LandVault transactions sender should create a contract with required informations, once a contract is created from the sender, the buyer have the option to accept or reject the contract, if the buyer accept the contract then the admin authority have the option to accept or reject the contract, choosing accept will make the transactions complete.

## Deployment

### Setting Up Browser Environment

* Download Metamask Extension in Browser 
* Create a Metamask account which will be the admin account for LandVault
* Setup Metamask with the following Custom Volta Network
    * Network Name: ```Energy Web Volta Testnet```
    * Default RPC URL: ```https://volta-rpc.energyweb.org```
    * Chain ID: ```73799```
    * Currency symbol: ```VT```
    * Block explorer URL: ```https://volta-explorer.energyweb.org```

### Deploying Smart Contracts & Setting Up Environment Variables

* Open terminal and navigate to smart contracts

```bash
    cd 'smart contracts'
```

* Install packages

```bash
    npm install
```

* Create a .env file in root of 'smart contracts' directory with the following variables

```bash
    API_URL = "https://volta-rpc.energyweb.org"
    PRIVATE_KEY = "<private_key_from_admin_metamask_account>"
```

* Deploy the smart contract to volta network with

```bash
    deploy contract -- npx hardhat ignition deploy ./ignition/modules/Lock.js --network volta
```

* Update the .env file with the contract address with following variable

```bash
    API_URL = "https://volta-rpc.energyweb.org"
    PRIVATE_KEY = "<private_key_from_admin_metamask_account>"
    CONTRACT_ADDRESS = "<contract_address_from_smart_contract_deployment>"
```

### IPFS Setup & Setting Next.JS Environment Variables

* Open terminal and navigate to app

```bash
    cd 'app'
```

* Install packages

```bash
    npm install
```

* Create a .env file in root of 'app' directory with the following variables and put smart contract address

```bash
    NEXT_PUBLIC_CONTRACT_ADDRESS="<contract_address_from_smart_contract_deployment>"
```

* Create a Pinata Cloud account at

```bash
    https://pinata.cloud/
```

* Update the .env file with the following variables

```bash
    NEXT_PUBLIC_CONTRACT_ADDRESS="<contract_address_from_smart_contract_deployment>"
    PINATA_API_KEY="private_api_key_from_pinata_cloud"
    PINATA_SECRET_API_KEY="private_secret_api_key_from_pinata_cloud"
```

### Deploying App

* Open terminal and navigate to app

```bash
    cd 'app'
```

* Start the app

```bash
    npm run dev
```

## Preview
<img src="/preview/preview_1.png" width="400"> <img src="/preview/preview_2.png" width="400">
<img src="/preview/preview_3.png" width="400"> <img src="/preview/preview_4.png" width="400">
<img src="/preview/preview_4.png" width="400"> <img src="/preview/preview_6.png" width="400">
  
## Presentation Link
  <a href="https://www.canva.com/design/DAGC_3xGmEc/x8u6LHUrDmXDrvLNfVnACA/edit">View Presentation on Canva</a>

## Tech Stack

Next.js, Pinata, IPFS, Solidity, Hardhat, Blockchain

## Created by

Team Name: LazyKoders

- [Subrat Pandey](https://github.com/imsubratpandey)
- [Aman Singh](https://github.com/amansingh0811)
- [Archana Yadav](https://github.com/archanay1203)

<a href="https://hack36.com"> <img src="https://i.postimg.cc/RFFWF4vg/built-at-hack.jpg" height=24px> </a>