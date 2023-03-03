require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const GOERLI = process.env.GOERLI_URL || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 2,
        },
    },
    localhost: {
        url: "http://127.0.0.1:8545/",
        chainId: 31337,
    },
    solidity: {
        compilers: [{ version: "0.8.0" }],
    },
    namedAccounts: {
        deployer: {
            //if using default network, use account (private key) in 0th position
            default: 0,
        },
        player: {
            default: 1,
        },
    },
    gasReporter: {
        enabled: false,
        outputFile: "gas-report.txt",
        noColors: true,
    },
    mocha: {
        timeout: 500000,
    },
}
