var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Product = require('../models/product');
var Manufacture = require('../models/manufacture');
var Chats = require('../models/chats');
var Bids = require('../models/bid');
var path = require('path');
var User = require('../models/user');
var Order = require('../models/order');
//show product to admin
router.get('/product',ensureAuthenticated,(req,res)=>{
    Product.find({},'productname description product_image status').lean().exec(function(err,product){
        if(err) return handleError(err);
           res.json(product);             
    });          
});

//show manufacturer to admin
router.get('/manufacturer',ensureAuthenticated,(req,res)=>{
    Manufacture.find({},'usertype name city status').lean().exec(function(err,manufacturer){
        if(err) return handleError(err);
        res.json(manufacturer);
    });
});
//get admin home page
router.get('/admins',ensureAuthenticated,(req,res)=>
{  
    res.send(' ');
});
//show the details of manufacturer to admin
router.get('/vendordetails/:id',ensureAuthenticated,(req,res)=>{  
    var id = req.params.id;
    Manufacture.findById(id).lean().exec((err,manufacturer)=>{
        if(err) return handleError(err);
        res.json(manufacturer);
    });       
});
 

//rejection of product by admin
router.get('/reject/:id',ensureAuthenticated,(req,res)=>
{   
    var email;
    User.findById(id,(err,user)=>{
        if(err) throw err;
        email = user.email;
    })
    console.log("email : " + email);
    const nodemailer = require('nodemailer');

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service : 'gmail',
            auth: {
                user: 'writeeamilhere', // generated ethereal user
                pass: 'passwordhere' // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: ' "Anuj" <anuj96sri@gmail.com>', // sender address
            to: eamil, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
        req.flash('error_msg','You rejected the request'); 
        res.json('');
    });
});

//acceptece of product by admin
router.get('/accept/:id',ensureAuthenticated,(req,res)=>{
    var id = req.params.id;
    Product.findByIdAndUpdate(id, { $set: { status: true}}, {new: true}, function(err, product) {
        if (err) {
            res.send(err);
        }
        req.flash('success_msg', 'You accepted the request!');
        res.json('');
    });      
});

//acceptece of manufacturer by admin
router.get('/maccept/:id',ensureAuthenticated,(req,res)=>{

    var id = req.params.id; 
    Manufacture.findByIdAndUpdate(id, { $set: { status: true}}, {new: true}, function(err, manufacturer) {
        if (err) {res.send(err);}
        req.flash('success_msg', 'You accepted the request!');
        res.json('');
    });         
});

//rejection of manufacturer by admin
router.get('/mreject/:id',ensureAuthenticated,(req,res)=>
{   
    const nodemailer = require('nodemailer');

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service : 'gmail',
            auth: {
                user: 'anuj96sri@gmail.com', // generated ethereal user
                pass: '9336114513' // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: ' "Anuj" <anuj96sri@gmail.com>', // sender address
            to: 'anujsrivastava@iiitdmj.ac.in', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
        req.flash('error_msg','You rejected the request'); 
        res.json('');
    });
});

//bidding started by admin
 

router.get('/start',ensureAuthenticated,(req,res)=>{
   Bids.findOneAndUpdate({bidid : 1}, { $set: { bidstart : true}}, {new: true}, function(err,bids) { 
        if(err) return err;
        res.json(bids); 
    });
});

 
//bidding stoped by admin
router.get('/stop',ensureAuthenticated,(req,res)=>{
   Bids.findOneAndUpdate({bidid : 1}, { $set: { bidstart : false}}, {new: true}, function(err,bid) { 
        if(err) return err; 
        res.json(bid);
    });
});

//post request for notification by admin
router.post('/notify',ensureAuthenticated,(req,res)=>{

    var notification = req.body.postContent;
    console.log("content : " + notification)
    let Pusher = require('pusher');
    let pusher = new Pusher({
        appId: process.env.PUSHER_APP_ID,
        key: process.env.PUSHER_APP_KEY,
        secret: process.env.PUSHER_APP_SECRET,
        cluster: process.env.PUSHER_APP_CLUSTER
    });
    pusher.trigger('notifications', 'post_updated', notification, req.headers['x-socket-id']);
    res.send('');

});

//get the locations of products
router.get('/locations',ensureAuthenticated,(req,res)=>{
    Chats.find({},(err,chats)=>{
        res.json(chats);
    });
});

//get nearest city
router.post('/nearcity',ensureAuthenticated,(req,res)=>{
    var location = req.body.postContent;
    Chats.find({location : location}).sort({price: 1}).lean().exec((err, bidprice)=>{
        if(err) return err;
        res.json(bidprice);
    });
});

router.get('/bidding',ensureAuthenticated,(req,res)=>{
     res.redirect('/usertype');
})

router.get('/differentproduct/',ensureAuthenticated,(req,res)=>{
    
    Product.aggregate([
        {
            $group: {
                _id: '$productname',  //$productname is the column name in collection
                count: {$sum: 1}
            }
        }
    ], function (err, result) {
        if (err) {
            next(err);
        } else {
             
            res.json(result);
        }
    });

})

router.get('/orderedproduct/',ensureAuthenticated,(req,res)=>{
    Order.find({},(err,order)=>{
         if(err) return err;
         res.json(order);
    })
})

router.get('/totalcustomer/',ensureAuthenticated,(req,res)=>{
    User.find({usertype : "Customer"},(err,customer)=>{
        if(err) return err;
        res.json(customer);
    })
})

router.get('/productrequest/',ensureAuthenticated,(req,res)=>{
    Product.find({status : false},(err,productstatus)=>{
        if(err) return err;
        res.json(productstatus);
    })
})

router.get('/vendorrequest/',ensureAuthenticated,(req,res)=>{
    Manufacture.find({status : false},(err,vendorstatus)=>{
        if(err) return err;
        res.json(vendorstatus);
    })
})

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg','You are not logged in');
    res.redirect('/users/login');
  }
}

module.exports = router;