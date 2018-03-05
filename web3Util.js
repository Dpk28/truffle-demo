var Web3 = require('web3');
var provider = "http://localhost:8545";
var web3;

module.exports = {
  connectToEthereumNode: function() {
	if (typeof web3 !== 'undefined') {
  		web3 = new Web3(web3.currentProvider);
	} else {
  		web3 = new Web3(new Web3.providers.HttpProvider(provider));
	}
    return web3;
  },

  getWeb3: function() {
    return web3;
  }
};