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

        const Transporter = await ethers.getContractFactory("Transporter");
        transporter = await Transporter.deploy(123);
        await transporter.deployed();
        

        return {myToken, transporter, owner, addr1, addr2};

    }

    describe("Token Deployment", function () {
        it("Should set the right owner", async function () {
            const { myToken, _, owner } = await loadFixture(testFixture);
            expect(await myToken.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply to the owner", async function() {
            const { myToken, _, owner } = await loadFixture(testFixture);
            const ownerBalance = await myToken.balanceOf(owner.address);
            const totalSupply = await myToken.totalSupply();
            expect(Number(totalSupply)).to.equal(Number(ownerBalance));
        });
    });

    describe("Transporter Deployment", function () {
        it("Should set the local domain", async function () {
            const { _, transporter } = await loadFixture(testFixture);
            expect(await transporter.localDomain()).to.equal(123);
        });
    });
    
        
});