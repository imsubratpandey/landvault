// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract SmartContract {
    //For storing the owner of the contract
    address public owner;

    //modifier to restrict everyone expect the owner to use a function
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    //Struct For The land
    struct Land {
        uint256 id;
        string addressOfTheLand;
        string priceOfLand;
        string areaOfTheLand;
        string ipfsLink;
        address sellerAddress;
        address buyerAddress;
        bool isVerifiedByBuyer;
        bool isVerifiedByGovt;
    }

    //For storing the transactions
    Land[] public lands;

    //For listing the transactions
    function list(
        string memory _addressOfTheLand,
        string memory _priceOfLand,
        string memory _areaOfTheLand,
        string memory _ipfsLink,
        address _buyerAddress
    ) public {
        address _sellerAddress = msg.sender;
        // Create Item
        Land memory land = Land(
            lands.length,
            _addressOfTheLand,
            _priceOfLand,
            _areaOfTheLand,
            _ipfsLink,
            _sellerAddress,
            _buyerAddress,
            false,
            false
        );

        lands.push(land);
    }

    //For getting pending transactions
    function getAllPendingTransaction() public view returns (Land[] memory) {
        uint count = 0;
        for(uint i = 0; i < lands.length; i++) {
            if((lands[i].isVerifiedByBuyer == false || lands[i].isVerifiedByGovt == false) && (lands[i].sellerAddress == msg.sender || lands[i].buyerAddress == msg.sender)) {
                count++;
            }
        }
        uint index = 0;
        Land[] memory answer = new Land[](count);
        for(uint i = 0; i < lands.length; i++) {
            if((lands[i].isVerifiedByBuyer == false || lands[i].isVerifiedByGovt == false) && (lands[i].sellerAddress == msg.sender || lands[i].buyerAddress == msg.sender)) {
                answer[index] = lands[i];
                index++;
            }
        }
        return answer;
    }

    //For getting received transactions
    function getAllReceivedTransaction() public view returns (Land[] memory) {
        uint count = 0;
        for(uint i = 0; i < lands.length; i++) {
            if(lands[i].isVerifiedByBuyer == false && lands[i].buyerAddress == msg.sender) {
                count++;
            }
        }
        uint index = 0;
        Land[] memory answer = new Land[](count);
        for(uint i = 0; i < lands.length; i++) {
            if(lands[i].isVerifiedByBuyer == false && lands[i].buyerAddress == msg.sender) {
                answer[index] = lands[i];
                index++;
            }
        }
        return answer;
    }

    //For getting all completed transactions
    function getCompletedTransaction() public view returns (Land[] memory) {
        uint count = 0;
        for(uint i = 0; i < lands.length; i++) {
            if(lands[i].isVerifiedByGovt == true && (lands[i].sellerAddress == msg.sender || lands[i].buyerAddress == msg.sender)) {
                count++;
            }
        }
        uint index = 0;
        Land[] memory answer = new Land[](count);
        for(uint i = 0; i < lands.length; i++) {
            if(lands[i].isVerifiedByGovt == true && (lands[i].sellerAddress == msg.sender || lands[i].buyerAddress == msg.sender)) {
                answer[index] = lands[i];
                index++;
            }
        }
        return answer;
    }

    //For getting all received transactions for admin
    function getAllReceivedTransactionAdmin() public onlyOwner view returns (Land[] memory) {
        uint count = 0;
        for(uint i = 0; i < lands.length; i++) {
            if(lands[i].isVerifiedByBuyer == true && lands[i].isVerifiedByGovt == false) {
                count++;
            }
        }
        uint index = 0;
        Land[] memory answer = new Land[](count);
        for(uint i = 0; i < lands.length; i++) {
            if(lands[i].isVerifiedByBuyer == true && lands[i].isVerifiedByGovt == false) {
                answer[index] = lands[i];
                index++;
            }
        }
        return answer;
    }

    //For getting all completed transactions for admin
    function getAllCompletedTransactionAdmin() public onlyOwner view returns (Land[] memory) {
        uint count = 0;
        for(uint i = 0; i < lands.length; i++) {
            if(lands[i].isVerifiedByGovt == true) {
                count++;
            }
        }
        uint index = 0;
        Land[] memory answer = new Land[](count);
        for(uint i = 0; i < lands.length; i++) {
            if(lands[i].isVerifiedByGovt == true) {
                answer[index] = lands[i];
                index++;
            }
        }
        return answer;
    }

    //For verification from buyer
    function verifyByBuyer(uint256 _id) public {
        for(uint i = 0; i < lands.length; i++) {
            if(lands[i].id == _id && lands[i].buyerAddress == msg.sender) {
                lands[i].isVerifiedByBuyer = true;
            }
        }
    }

    //For verification from government
    function verifyByGovt(uint256 _id) public onlyOwner {
        for(uint i = 0; i < lands.length; i++) {
            if(lands[i].id == _id && lands[i].isVerifiedByBuyer == true) {
                lands[i].isVerifiedByGovt = true;
            }
        }
    }
}