var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//import 同目錄的 eventEmitter.js
var eventEmitter = require('./eventEmitter.js')

// import 同目錄的 web3.js
var web3 = require('./web3.js')
var eth = web3.eth

//import 同目錄的 bank
var bank = require('./bank.js')

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


//使 static 中的檔案能被讀取
app.use(express.static(path.resolve(__dirname, 'static')))

// 註冊 body-parser 處理 body stream
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

// ?a=address
app.get('/account', function (req, res) {
	var account = req.query.a

	// 先取得 etherBalance
	eth.getBalance(account, function (err, ethBalance) {
		if (!err) {
			// 再取得 bank balance
			// { from: account } 為 tx object
			bank.checkBankBalance({
				from: account
			}, function (err, bankBalance) {
				if (!err) {
					// 回傳 json
					res.json({
						address: account,
						ethBalance: ethBalance,
						bankBalance: bankBalance
					})
				} else {
					console.log(err)
					res.status(500).json(err)
				}
			})
		} else {
			console.log(err)
			res.status(500).json(err)
		}
	})
})

// 取得以太帳戶們
app.get('/accounts', function (req, res) {
	eth.getAccounts(function (err, accounts) {
		if (!err) {
			res.json(accounts)
		} else {
			console.log(err)
			res.status(500).json(err)
		}
	})
})

// ?a=address&e=etherValue
app.post('/deposit', function (req, res) {
	var account = req.query.a
	var value = parseInt(req.query.e, 10)

	// 存款
	// 而 deposit 雖然本身沒有 args，但是需要透過描述 tx object 來達成送錢與表明自己的身分 (以哪個帳戶的名義)
	bank.deposit({
		from: account,
		value: web3.toWei(value, 'ether'),
		gas: 4600000
	}, function (err, txhash) {
		if (!err) {
			// 當 eventEmitter 收到事件描述之後，只會觸發一次以下的 callback
			eventEmitter.once('DepositEvent:' + account, function (eventPayload) {
				// 增加 txhash 欄位
				eventPayload['txhash'] = txhash
					// 並回傳 json
				res.json(eventPayload)
			})
		} else {
			console.log(err)
			res.status(500).json(err)
		}
	})
})

// ?a=address&e=etherValue
app.get('/withdraw', function (req, res) {
	var account = req.query.a
	var etherValue = parseInt(req.query.e, 10)

	// 提款
	// withdraw 本身只有一個 args，而 { from: account, gas: ...  } 為 tx object
	bank.withdraw(etherValue, {
		from: account,
		gas: 4600000
	}, function (err, txhash) {
		if (!err) {
			// 當 eventEmitter 收到事件描述之後，只會觸發一次以下的 callback
			eventEmitter.once('WithdrawEvent:' + account, function (eventPayload) {
				// 增加 txhash 欄位
				eventPayload['txhash'] = txhash
					// 並回傳 json
				res.json(eventPayload)
			})
		} else {
			console.log(err)
			res.status(500).json(err)
		}
	})
})

// ?f=address&t=address&e=etherValue
app.post('/transfer', function (req, res) {
	var from = req.query.f
	var to = req.query.t
	var etherValue = parseInt(req.query.e, 10)

	// 提款
	// withdraw 本身有兩個 args，而 { from: from, gas: ... } 為 tx object
	bank.transfer(to, etherValue, {
		from: from,
		gas: 4600000
	}, function (err, txhash) {
		if (!err) {
			// 當 eventEmitter 收到事件描述之後，只會觸發一次以下的 callback
			eventEmitter.once('TransferEvent:' + from, function (eventPayload) {
				// 增加 txhash 欄位
				eventPayload['txhash'] = txhash
					// 並回傳 json
				res.json(eventPayload)
			})
		} else {
			console.log(err)
			res.status(500).json(err)
		}
	})
})

/*var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var coinbase = web3.eth.coinbase;
console.log(coinbase);
console.log(web3.eth.getBalance(coinbase).toNumber());*/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.get('/100', function (req, res) {
	  res.send('Hello world!');
	});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});






module.exports = app;
