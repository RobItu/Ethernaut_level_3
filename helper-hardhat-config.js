const { ethers } = require("hardhat")

const networkConfig = {
    5: {
        name: "goerli",
        blockConfirmations: 2,
        coinFlipAddress: "0x6CC5b164aacF698F0b8b781f6aEB440C5E1e5f9a",
    },
    31337: {
        name: "hardhat",
        blockConfirmations: 1,
    },
}

const developmentChains = ["hardhat", "localhost", 31337]

module.exports = {
    networkConfig,
    developmentChains,
}
