var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');



var Account = new Schema({
    username: String,
    password: String,
    phonenum: String,
    address: String
});

Account.plugin(passportLocalMongoose);

var Account = mongoose.model('Account', Account);

module.exports = Account;