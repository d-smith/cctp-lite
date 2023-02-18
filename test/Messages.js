const { expect } = require("chai");
require( "@nomicfoundation/hardhat-chai-matchers" )
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Token contract", function() {
    async function testFixture() {
        [owner, addr1, addr2] = await ethers.getSigners();

        const Deposit = await ethers.getContractFactory("Deposit");
        deposit = await Deposit.deploy();
    
        return { addr1, addr2, deposit };
    }

    describe("do it test", function() {
        
        it("can do stuff", async function() {
            const { deposit, addr1 } = await loadFixture(testFixture);
            await expect(deposit.connect(addr1).doIt())
                .to.emit(deposit, "DidIt")
                .withArgs(addr1.address);
        });

    });
    
        
});