const { expect } = require("chai");
require( "@nomicfoundation/hardhat-chai-matchers" )
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

describe("Token contract", function() {
    async function testFixture() {
        let [owner, addr1, addr2] = await ethers.getSigners();

        const MyToken = await ethers.getContractFactory("MyToken");
        myToken = await MyToken.deploy();
        await myToken.deployed();

        return {myToken, owner, addr1, addr2};

    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { myToken, owner } = await loadFixture(testFixture);
            expect(await myToken.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply to the owner", async function() {
            const { myToken, owner } = await loadFixture(testFixture);
            const ownerBalance = await myToken.balanceOf(owner.address);
            const totalSupply = await myToken.totalSupply();
            expect(Number(totalSupply)).to.equal(Number(ownerBalance));
        });
    });
    
        
});