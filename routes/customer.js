
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Customer = require('../models/customer')

router.post('/profileadd/:id',ensureAuthenticated,(req,res)=>{
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
      var email= user.email;
      var username = user.username;
      var complete = true;
 
		var newCustomer = new Customer({
			  name: name,
			  email:email,
		    address:address,
		    phone: phone,
		    state: state,
		    city : city,
		    zip: zip,
		    userid: userid,
        username : username,
			  complete : complete
		});
		Customer.createCustomer(newCustomer,(err, customer)=>{
			if(err) throw err;
			req.flash('success_msg', 'You profile is saved!');
		  res.json('');			 
		});
		
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
    console.log("Name : " + name);
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

    Customer.findByIdAndUpdate(id, newvalues ,{new: true }).lean().exec(function(err,customer){
        if (err) throw err;
        console.log("Customer : " + customer);
        req.flash('success_msg', 'You profile is changed!');
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