var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var policeStationRouter = require("./routes/policestation")

Web3 = require('web3')
MyContractJSON = require("../build/contracts/CaseRegister.json");
web3 = new Web3("http://localhost:8545");
contractAddress = MyContractJSON.networks[4002].address;
abi = MyContractJSON.abi;

accounts =web3.eth.getAccounts().then(accounts=>{
  ownerAddr = accounts[0];
  console.log(ownerAddr);
});


CaseReg = new web3.eth.Contract(abi,contractAddress);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use("/policestation",policeStationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
