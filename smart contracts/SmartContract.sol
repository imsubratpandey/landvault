// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract SmartContract {
    //For storing the owner of the contract
    address public owner;

    //modifier to restrict everyone expect the owner to use a function
    modifier onlyOwner(){
        require(msg.sender == owner, "Only Owner is Allowed to Access this contract");
        _;
    }


    constructor() {
        owner = msg.sender;
    }


    //Struct For The land
    struct Land {
        uint256 id;
        string addressOfTheLand;
        uint256 priceOfLand;
        uint256 areaOfTheLand;
        address sellersAddress;
        address buyersAddress;
    }

    //For storing the transactions
    mapping(uint256 => Land) public items;
    
    //For emitting a event if a new transaction begins
    event List(string addressOfLand, uint256 priceOfLand, uint256 areaOfLand,address sellersAddress,address buyersAddress);

    //For listing the transactions
    function list(
        uint256 _id,
        string memory _addressOfTheLand,
        uint256 _priceOfLand,
        uint256 _areaOfTheLand,
        address _sellersAddress,
        address _buyersAddress
    ) public onlyOwner {
        // Create Item
        Land memory land = Land(
            _id,
            _addressOfTheLand,
            _priceOfLand,
            _areaOfTheLand,
            _sellersAddress,
            _buyersAddress
        );

        // Add Item to mapping
        items[_id] = land;

        // Emit event
        emit List(_addressOfTheLand, _priceOfLand, _areaOfTheLand, _sellersAddress, _buyersAddress);
    }
}