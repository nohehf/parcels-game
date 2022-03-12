import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy-ethers';
import 'hardhat-deploy';
import '@symfoni/hardhat-react';
import 'hardhat-typechain';
import '@typechain/ethers-v5';
import "@nomiclabs/hardhat-etherscan";

import { HardhatUserConfig, task } from 'hardhat/config';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const ALCHEMY_API_KEY = "3ANw5WNTJdc_aK7ApwGpzWBYb_9MDnWr";
const test_mnemonic = "three siren fatigue length coast snow cost design shuffle arrest tenant flash creek chicken lizard rough fix second expose clarify coast";
const ETHERSCAN_API_KEY = "PZGHF4PVPSQRARMV5GQYK5VYC12BFQEWYI";
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  react: {
    providerPriority: ["web3modal", "hardhat"],
  },
  paths: {
    "react": "./frontend-next/hardhat",
    "deployments": './frontend-next/hardhat/deployments',
  },
  typechain: {
    "outDir": "./frontend-next/hardhat/typechain",
    "target": "ethers-v5"
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      gasMultiplier: 10000,
      allowUnlimitedContractSize: true,
    },
    hardhat: {
      chainId: 1337,
      inject: false, // optional. If true, it will EXPOSE your mnemonic in your frontend code. Then it would be available as an "in-page browser wallet" / signer which can sign without confirmation.
      gas: 4698712,
      gasPrice: 25000000000,
      allowUnlimitedContractSize: true,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk", // test test test test test test test test test test test junk
      },
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      gasPrice: "auto",
      gas: "auto",
      accounts: {
        mnemonic: `${test_mnemonic}`,
      }
    }
    // hardhat: {
    //   accounts: [
    //     {
    //       balance: "10000000000000000000000",
    //       privateKey:
    //         "0xe87d780e4c31c953a68aef2763df56599c9cfe73df4740fc24c2d0f5acd21bae",
    //     },
    //   ],
    // },
  },
  etherscan: {
    apiKey: `${ETHERSCAN_API_KEY}`,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};
export default config;
