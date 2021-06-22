const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  //'12 word mneumonic here',
  'https://rinkeby.infura.io/v3/528bdb81c61549229fe315ac52d95719'
);

const web3 = new Web3(provider);

// similar to the test

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account',accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({gas: '1000000', from: accounts[0]});

  console.log('Contract deployed to', result.options.address);
};
deploy();
