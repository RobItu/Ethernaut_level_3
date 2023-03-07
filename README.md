# Ethernaut Level 3

Code that I used to pass the Coin Flip security puzzle from OpenZeppelin's Ethernaut challenge. Using hardhat, I created a script that would determine the same block hash that the target smart contract used to determine it's randomness. With this knowledge, I correctly guessed 10 times in a row the outcome of flipping the coin. Learned how to interact with a deployed contract. 

## To replicate

1. Login with your Web3 wallet to [Ethernaut](https://ethernaut.openzeppelin.com/level/0x9240670dbd6476e6a32055E52A0b0756abd26fd2)
2. Git clone this repo
3. In `Attack.js` script, change `deployedContract` variable to your instance address. 
4. Create `.env` file with your GOERLI node API key and TEST Web3 wallet private key.
5. `yarn hardhat run scripts/Attack.js --network goerli`

In the Ethernaut console, `await contract.consecutiveWins()` will track the number of correct guesses. 
