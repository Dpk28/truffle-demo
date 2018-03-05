require('rootpath')();

var express = require('express');
var app = express();
var Web3 = require('web3Util');
var bodyParser = require('body-parser');
var contractConfig = require('./build/contracts/SimpleStorage.json');

app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Web3.connectToEthereumNode();
web3 = Web3.getWeb3();

app.get('/get', function (req, res) {
    var myContract = web3.eth.contract(contractConfig.abi);

    var myContractInstance = myContract.at(contractConfig.networks['1520262717771'].address);
    var value = myContractInstance.get();
    res.send({value: value});
})

app.post('/set', function (req, res) {
    var myContract = web3.eth.contract(contractConfig.abi);

    var myContractInstance = myContract.at(contractConfig.networks['1520262717771'].address);
    myContractInstance.set(req.body.value, {from:"0xf6df10eb1b4706f7de15937adb7a198090a06bcb", gas: "1000000"}, function(err, result){
      res.send(result);
    });
})

app.listen(3001, function() {
      console.log('Server listening');
});
