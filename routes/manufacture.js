var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Manufacture = require('../models/manufacture');
var Product = require('../models/product');


// Add Profile
router.post('/profileadd/:id',ensureAuthenticated,(req,res)=>
{   
    var id = req.params.id; 
    User.getUserById(id,(err, user)=>{
      if(err) throw err;    
      var name=user.name;
      var phone = req.body.phone;
      var address = req.body.address;
      var city = req.body.city;
      var state = req.body.state;
      var zip = req.body.zip;
      var userid = id;
      var usertype = user.usertype;
      var email= user.email;
 
    var newManufacture = new Manufacture({
        name: name,
        email:email,
        address:address,
        phone: phone,
        state: state,
        city : city,
        zip: zip,
        userid: userid,
        usertype : usertype 
       
    });
    Manufacture.createManufacture(newManufacture,(err, user)=>{
      if(err) throw err;       
    });

    req.flash('success_msg', 'You profile is saved!');
    console.log("Name : " + user.name);
    res.json('');
   });
});

router.put('/editprofile/:id',ensureAuthenticated,(req,res)=>{
    var id = req.params.id; 
    var name = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;

    var newvalues = { 
      $set: {
        name : name,
        phone: phone, 
        address: address,
        city : city,
        state : state,
        zip : zip
      } 
    };
    Manufacture.findByIdAndUpdate(id, newvalues ,{new: true }).lean().exec(function(err,manufacturer){
      if (err) throw err;
      req.flash('success_msg', 'You profile is changed!');
      res.json('');   
    });          
});


router.get('/vendor',(req,res)=>{
    Manufacture.find({status : true},'name address city state zip').lean().exec((err,manufacturer)=>{
        if(err) return err;
        res.render('manufacturermap',{
            encodedJson  : encodeURIComponent(JSON.stringify(manufacturer)),
        })
    });
});

router.get('/detail/:id',(req,res)=>{
    var productId = req.params.id; 
    Product.findById(productId).lean().exec((err,product)=>{
        if(err) return err;
        var ManufactureId = product.usertypeid;
        Manufacture.findOne({userid : ManufactureId}).lean().exec((err,manufacturer)=>{
            if(err) return handleError(err); 
            res.json(manufacturer);
        });             
    });
});

router.get('/subscribe/:id',ensureAuthenticated,(req,res)=>{
    console.log("Anuj");
    var id = req.params.id;
    console.log("id id "+id);
    Manufacture.findByIdAndUpdate(id, { $set: { subscribe: true}}, {new: true}, function(err, user) {
        if (err) {res.send(err);}
        console.log('Document updated');
        req.flash('success_msg', 'You subscribed for participation in bidding!');
        res.json(''); 
    });
});

function ensureAuthenticated(req, res, next){
   if(req.isAuthenticated()){
      return next();
   } else {
      req.flash('error_msg','You are not logged in');
      res.redirect('/users/login');
   }
} 

module.exports = router;