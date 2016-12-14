var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

//var io = require('socket.io').listen(server);


var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var coinbase = web3.eth.coinbase;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',user : req.user });
});

router.get('/abc', function(req, res, next) {
  res.redirect('/');
});


/*title: 'Express' , abc: web3.fromWei(web3.eth.getBalance(coinbase).toString(),'ether')*/

router.get('/register', function(req, res) {
    res.render('register', { error : req.err });
});

router.post('/register', function(req, res, next) {
    Account.register(new Account({ username : req.body.username , phonenum : req.body.phonenum , address : req.body.address }), req.body.password, function(err, account) {
        if (err) {
          return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/profile', function(req, res) {
    res.render('profile', { user : req.user });
});

router.post('/profile', passport.authenticate('local'),function(req, res, next) {

    var condition = {username: req.body.username},
        update = {$set: {phonenum: req.body.phonenum,address: req.body.address, rental: req.body.rental ,size: req.body.size}};
        
    Account.update(condition,update, function(err){
        console.log('update error');
    });
    res.send("<a href='/'>更新成功 點擊回主頁</a>");
});

        

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});


module.exports = router;
