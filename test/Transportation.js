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

        const Message = await ethers.getContractFactory("Message");
        message = await Message.deploy();
        await message.deployed();

        const Transporter = await ethers.getContractFactory("Transporter", {
            libraries: {
                Message: message.address,
            }
        });
        transporter = await Transporter.deploy(123);
        await transporter.deployed();
        

        return {myToken, transporter, owner, addr1, addr2, message};

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

    describe("Deposit for burn", function() {
        it("Allows deposit for burn", async function() {
            const {myToken, transporter, _, addr1, addr2, message } =  await loadFixture(testFixture);
            
            console.log('allowance set up');
            await myToken.transfer(addr1.address, 50);
            await myToken.connect(addr1).approve(transporter.address, 10);
            const allowance = await myToken.allowance(addr1.address, transporter.address);
            expect(Number(allowance)).to.equal(10);

            console.log('get b32 address')
            let b32addr = await message.addressToBytes32(addr2.address);

            console.log('call deposit for burn')
            await expect(transporter.connect(addr1).depositForBurn(
                6,
                234, 
                b32addr, //any address will due for this test
                myToken.address
            ))
            .to.emit(transporter, "DepositForBurn");

            const addr1Balance = await myToken.balanceOf(addr1.address);
            expect(Number(addr1Balance)).to.equal(44);
        });
        
    });
    
        
});