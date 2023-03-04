require("dotenv").config()

const fs = require("fs")
const { ethers, getNamedAccounts } = require("hardhat")
const Web3 = require("web3")

const GOERLI_URL = process.env.GOERLI_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

const web3 = new Web3()
const fsPromises = fs.promises
const ABI_FILE_PATH = "artifacts/contracts/CoinFlip.sol/CoinFlip.json"
const deployedContract = "0x6CC5b164aacF698F0b8b781f6aEB440C5E1e5f9a"

const FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968

async function getAbi() {
    const data = await fsPromises.readFile(ABI_FILE_PATH, "utf8")
    const abi = JSON.parse(data)["abi"]
    return abi
}

async function main() {
    const abi = await getAbi()
    deployer = (await getNamedAccounts()).deployer

    let provider = ethers.getDefaultProvider(GOERLI_URL)
    let signer = new ethers.Wallet(PRIVATE_KEY, provider)
    let targetContract = new ethers.Contract(deployedContract, abi, signer)

    const blockNumBefore = await ethers.provider.getBlockNumber(-1)
    const blockBefore = await ethers.provider.getBlock(blockNumBefore)
    const blockHash = blockBefore.hash
    const bigNumber = web3.utils.toBN(blockHash)
    const coinState = bigNumber / FACTOR

    console.log(`blockNumBefore: ${blockNumBefore}`)
    console.log(`blockBefore: ${blockBefore}`)
    console.log(`blockHash: ${blockHash}`)
    console.log(`bigNumber: ${bigNumber}`)

    if (coinState >= 1) {
        const tx = await targetContract.flip(true)
        await tx.wait(2)
        console.log("True!")
        console.log(coinState)
    } else {
        const tx = await targetContract.flip(false)
        await tx.wait(2)
        console.log("False!")
        console.log(coinState)
    }
    console.log("Done!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
