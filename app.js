// dotnev import key and secret for pubnub Notification API
require('dotenv').config();
// import all dependecies required for our app
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var multer = require('multer');
var upload = multer({dest : './public/uploads/'});
var Handlebars = require('handlebars');
var validator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var swal = require('sweetalert');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var app = express();
const config = require('./config/database');
var MongoStore = require('connect-mongo')(session); 
var logger = require('morgan');
var nodemailer = require('nodemailer');
require('./config/passport');
require('./config/googlepassport')(passport);

var server = require('http').createServer(app);
const client = require('socket.io').listen(server).sockets;

//start the server


Handlebars.registerHelper('iff', function(a, operator, b, opts) {
    var bool = false;
    switch(operator) {
       case '==':
           bool = a == b;
           break;
       case '>':
           bool = a > b;
           break;
       case '<':
           bool = a < b;
           break;
       default:
           throw "Unknown operator " + operator;
    }
 
    if (bool) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

 

// import all the routes
var usertype = require('./routes/usertype');
var users = require('./routes/users');
var manufacture = require('./routes/manufacture');
var product = require('./routes/product');
var admin = require('./routes/admin');
var routes = require('./routes/index');
var customer = require('./routes/customer');
var auth = require('./routes/auth');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret', 
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));
// use flash for message and session for information
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
//we can use these varible inside our app anywhere
app.use( (req, res, next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.session = req.session;
  next();
});
//define the uri
app.use('/',routes);
app.use('/usertype', usertype);
app.use('/users', users);
app.use('/manufacture', manufacture);
app.use('/product', product);
app.use('/admin',admin);
app.use('/customer', customer);
app.use('/auth',auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

  

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

 
 

//connect to monogodb
 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mamta:mamta123@ds155699.mlab.com:55699/learn', { useMongoClient: true },function(err, db){
    if(err){
        throw err;
    }
    var bidStatus;
    console.log('MongoDB connected...');
    //uncomment commented line when you run your app first time and then comment it again 
    var Bids = require('./models/bid');
    /*var bid = new Bids({
        bidstart : false,
        bidid : 1
    });
    bid.save((err,result)=>{
        if(err) return err;
        console.log("Bid : " + result);
    })*/
    
    // Connect to Socket.io
    client.on('connection', function(socket){
        //import chat schema
        let chat = require('./models/chats');
        // Create function to send status
        sendStatus = function(s){
            socket.emit('status', s);
        }
        // Get chats from mongo collection
        chat.find().limit(100).sort({_id:1}).lean().exec(function(err, res){
            if(err){
                throw err;
            }
            //Emit the messages
            socket.emit('output', res);
        });
        // Handle input events
        socket.on('input', function(data){
            let name = data.name;
            let message = data.message;
            let location = data.location;
            let manufacturing_date = data.manufacturing_date;
            let price  = data.price;
            let product_name = data.product_name;
            let username = data.username;

            Bids.findOne({bidid : 1}).lean().exec((err,bidstatus)=>{
              if(err) throw err;
               bidStatus = bidstatus.bidstart;
               console.log("BidStatus : " + bidStatus);
               // Check for name and message
            if(bidStatus === false){
                // Send error status
                sendStatus('Bidding is stopped by admin');
            } 
            else if(name == '' || message == '' || location == '' || manufacturing_date == ''|| 
                price == '' || product_name == ''){
              sendStatus('Please fill all the information');
            }
            else {
                // Insert message
                var Chat1 = new chat({
                    name: name,
                    message: message,
                    location : location,
                    manufacturing_date : manufacturing_date,
                    price : price,
                    product_name : product_name,
                    username : username
                });
                //find chat by username 
                chat.findOne({username : username},(err,bids)=>{
                    if(err){
                        return err;
                    }
                    //if we don't get any chat with this username then insert new chat
                    if(!bids){
                        Chat1.save(function(err, result){
                            client.emit('output', [data]);
                            // Send status object
                            sendStatus({
                                message: 'Message sent',
                                clear: true
                            });
                        });
                    }
                    //if chat is already exist with this username then update it
                    else{
                        chat.findOneAndUpdate({username : username}, 
                        { $set: { 
                            name: name,
                            message: message,
                            location : location,
                            manufacturing_date : manufacturing_date,
                            price : price,
                            product_name : product_name,
                            username : username
                          }
                        }, 
                        {new: true}, 
                        function(err,bid) { 
                            client.emit('output', [data]);
                            // Send status object
                            sendStatus({
                                message: 'Message sent',
                                clear: true
                            });
                        }); 
                    }
                });    
            }//else end
                
            });
    
            
        });
        // Handle clear
        socket.on('clear', function(data){
            // Remove all chats from collection
            chat.remove({}, function(){
                // Emit cleared
                socket.emit('cleared');
            });
        });
    });    
});

server.listen(process.env.PORT || 3000,function(){
   console.log("Port is listening!");
});

module.exports = app;