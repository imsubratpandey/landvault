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


    //Struct For The land
    struct Land {
        uint256 id;
        string addressOfTheLand;
        uint256 priceOfLand;
        uint256 areaOfTheLand;
    }
}