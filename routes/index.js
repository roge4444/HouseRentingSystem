var express = require('express');
var router = express.Router();

//var io = require('socket.io').listen(server);


var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var coinbase = web3.eth.coinbase;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , abc: web3.fromWei(web3.eth.getBalance(coinbase).toString(),'ether') });
});



module.exports = router;
