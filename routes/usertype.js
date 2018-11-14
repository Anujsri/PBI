 var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/product');
var Manufacturer = require('../models/manufacture');
var Order = require('../models/order');
var Cart = require('../models/cart');
var Customer = require('../models/customer');
var Bids = require('../models/bid');
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);
var User = require('../models/user');
 // Get Homepage 
router.get('/', ensureAuthenticated, function(req, res){    
  if(req.user.usertype== "Manufacturer" || req.user.usertype == "Supplier"){      
        Manufacturer.findOne({userid : req.user.id}).lean().exec(function(err,manufacturer){     
            if(err) return handleError(err);
            Bids.findOne({bidid : 1},(err,bid)=>{
                if(err) return handleError(err);
                res.render('vendor/vendorindex',
                    {manufacturer,bid
                });                     
            });
                 
        });    
    }

    if(req.user.usertype=="Customer"){

        Customer.findOne({userid : req.user.id}).lean().exec(function(err,customer){
           if(err) return err;
           Order.find({user: req.user }).sort({orderdate: -1}).lean().exec(function(err, orders) {
                if (err) {
                    return res.write('Error!');
                }
                var cart;
                orders.forEach(function(order) {
                    cart = new Cart(order.cart);
                    order.items = cart.generateArray();
                });
                res.render('customer/customerindex', {
                    orders: orders,
                    customer : customer
                });
            });   
        });

    }


    if(req.user.usertype=="admin"){

        Manufacturer.find({}).lean().exec((err,manufacturer)=>{
            if(err) return err;
            Product.find({}).lean().exec((err,product)=>{    
                if(err) return err;
                console.log("Total length product : " + product.length);
                var len = product.length;
                Product.find({price:{$gte:5 ,$lte:100}}).lean().exec((err,products)=>{
                    if(err) return err;
                    if(!products){
                        req.flash('error_msg','No Product in this range');
                        res.render('adminfiles/admin');
                    }
                    Product.find({productname:{$regex:"tea",$options:"is"}}).lean().exec((err,productreg)=>{
                        if(err) return err;
                        if(!products){
                            req.flash('error_msg','No Product found with this name');
                            res.render('adminfiles/admin');
                        }
                        else{
                            Product.find({status : true}).sort({price: -1}).lean().exec(function(err, productdescen) {
                                if(err) return err;
                                Product.find({status : true}).sort({quantity : -1}).lean().exec(function(err,qty){
                                    if(err) return err;
                                    Product.find({status : true}).sort({price: 1}).lean().exec(function(err, productascen) {
                                         if(err) return err;
                                         res.render('adminfiles/admin',{
                                            encodedJson  : encodeURIComponent(JSON.stringify(products)),
                                            encodedJson1  : encodeURIComponent(JSON.stringify(productreg)),
                                            encodedJson2  : encodeURIComponent(JSON.stringify(productdescen)),
                                            encodedJson3  : encodeURIComponent(JSON.stringify(product)),
                                            encodedJson4  : encodeURIComponent(JSON.stringify(qty)),
                                            product,
                                            manufacturer,
                                            len,
                                            productdescen,
                                            productascen
                                    });
                                    });
                                    
                                });
                            });
                        }    
                    });
                }) 
            });
        });                 
    } 
    if(!req.user.usertype){
        res.render('usertype', {csrfToken: req.csrfToken()});
         
    }    
});

router.post('/edit/:id',ensureAuthenticated,(req,res)=>{
    var usertype = req.body.usertype;
    var id = req.params.id;
    console.log("Anuj");
    User.findByIdAndUpdate(id, { $set: { usertype: usertype}}, {new: true}).exec(function(err, user) {
        if(err) throw(err);
        console.log("User " +user);
        res.redirect('/usertype');
    });    
})
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    //req.flash('error_msg','You are not logged in');
    res.redirect('/users/login');
  }
}



module.exports = router;
