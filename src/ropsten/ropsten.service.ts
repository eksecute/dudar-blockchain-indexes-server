import {HttpStatus, Injectable} from '@nestjs/common';
const Web3 = require('web3');
require('dotenv').config({ path: `./.env` });

import handleErrorResponse from '../common/helpers/handleErrorResponse.helper'

@Injectable()
export class RopstenService {
  private _abi: any = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getGroupIds",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_groupId",
          "type": "uint256"
        }
      ],
      "name": "getGroup",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256[]",
          "name": "ropsten",
          "type": "uint256[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_indexId",
          "type": "uint256"
        }
      ],
      "name": "getIndex",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "ethPriceInWei",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "usdPriceInCents",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "usdCapitalization",
          "type": "uint256"
        },
        {
          "internalType": "int256",
          "name": "percentageChange",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];

  private web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/${process.env.API_KEY}`));

  async getGroupIds() {
    try {
      const { _abi, web3 } = this;

      web3.eth.net.isListening()
        .then(() => console.log('web3 is connected'))
        .catch(err => console.log(`Something went wrong. ${err}`));

      const contract = new web3.eth.Contract( _abi, process.env.ADDRESS );

      const data = await contract.methods.getGroupIds().call();

      return {
        statusCode: HttpStatus.OK,
        data
      }
    } catch (err) {
      handleErrorResponse(err);
    }
  }

  async getGroup(id) {
    try {
      const { _abi, web3 } = this;

      web3.eth.net.isListening()
        .then(() => console.log('web3 is connected'))
        .catch(err => console.log(`Something went wrong. ${err}`));

      const contract = new web3.eth.Contract( _abi, process.env.ADDRESS );

      const data = await contract.methods.getGroup(id).call();

      return {
        statusCode: HttpStatus.OK,
        data
      }
    } catch (err) {
      handleErrorResponse(err);
    }
  }

  async getIndex(id) {
    try {
      const { _abi, web3 } = this;

      web3.eth.net.isListening()
        .then(() => console.log('web3 is connected'))
        .catch(err => console.log(`Something went wrong. ${err}`));

      const contract = new web3.eth.Contract( _abi, process.env.ADDRESS );

      const data = await contract.methods.getIndex(id).call();

      return {
        statusCode: HttpStatus.OK,
        data
      }
    } catch (err) {
      handleErrorResponse(err);
    }
  }

  async getLastBlock() {
    try {
      let lastBlock;
      const { web3 } = this;

      const latest = await web3.eth.getBlockNumber();
      const batch = new web3.eth.BatchRequest();

      await new Promise<void>(function(resolve, reject){
        batch.add(
          web3.eth.getBlock.request(latest, (err, res) => {
            if (err)  {
              console.error(333, err)
              return reject(err);
            }

            lastBlock = res;
            resolve();
          })
        );

        batch.execute()
      });

      return {
        statusCode: HttpStatus.OK,
        data: {
          lastBlock
        }
      }
    } catch (err) {
      handleErrorResponse(err);
    }
  }
}
