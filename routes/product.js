var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Product = require('../models/product');
var User = require('../models/user'); 
var Manufacturer = require('../models/manufacture');
var Bids = require('../models/bid');
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
   destination : function (req,file,cb){
    cb(null,'./public/uploads/');
   },
   filename : function (req,file,cb){
    cb(null,file.originalname + '-' + Date.now() + path.extname(file.originalname));
   } 
});

var upload = multer({
  storage : storage,
  limits : {fileSize : 2000000},
  fileFilter : function (req,file,cb){
    checkFileType(file,cb)}
}).any();
// Add Product
function checkFileType(file,cb){
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
      return cb(null,true);
    }
    else{
      cb('Error : Image Only');
    }
}

// Add Product

router.post('/addproduct/:id',isLoggedIn,upload,(req,res)=>
{
      var id = req.params.id;                                                            
      var productname=req.body.aproductname;
      var quantity = req.body.aquantity;
      var price = req.body.aprice;
      var usertypeid = id;
      var location = req.body.alocation;
      var category = req.body.acategory;
      var subcategory = req.body.subcategory;
      var manufacturingdate = req.body.amanufacturingdate;
      var bestbefore = req.body.abestbefore;
      var description = req.body.adescription;
      var city = req.body.acity;
      var state = req.body.astate;
      var zip = req.body.azip;
      var weight = req.body.aweight;
      
       if(req.files){
        var certificateimage = req.files[0].filename;
        var product_image  = req.files[1].filename;
        var newProduct = new Product({
        productname: productname,
        quantity:quantity,
        price:price,
        usertypeid: usertypeid,
        location: location,
        category : category,
        subcategory: subcategory,
        manufacturingdate: manufacturingdate,
        bestbefore : bestbefore,
        description : description,
        city : city,
        state : state,
        zip : zip,
        weight : weight ,
        certificateimage : certificateimage,
        product_image : product_image
    });

    Product.createProduct(newProduct,(err, product)=>{
      if(err) throw err;  
      req.flash('success_msg', 'You Product has been added!');
      console.log("Name : " + product.productname)
      res.redirect('/usertype');
    });    

      }else{
        req.flash('error_msg','Upload Images');
       res.redirect('/usertype');
      }
});

router.get('/lowToHigh/',(req,res)=>{
    Product.find({status : true},
    'productname price product_image').sort({price: 1}).
    lean().exec(function(err, asendingpro){
        if(err) return handleError(err);
        res.json(asendingpro);
    }); 
});

router.get('/HighToLow/',(req,res)=>{
    Product.find({status : true},
    'productname price product_image').sort({price: -1}).
    lean().exec(function(err, desendingpro){
        if(err) return handleError(err);
        res.json(desendingpro);
    }); 
});

router.post('/range',(req,res)=>
{  
    var low = req.body.low;
    var high = req.body.high;   
    Product.find({status : true, price:{$gte:low ,$lte:high}}).lean().exec((err,productr)=>{
        if(err) return err;
        if(productr.length === 0){
          req.flash('error_msg','No product found within this range'); 
          res.json(productr);
        }
        else{
          res.json(productr);
        }   
    });
     
});

router.post('/search',(req,res)=>{
    var productname = req.body.search;
    Product.find({status : true,productname:{$regex : productname,$options:"is"}}).lean().exec((err,productsearch)=>{
        if(err) return err;
        if(productsearch.length === 0){
          req.flash('error_msg','No product found with this name'); 
          res.json(productsearch);
        }
        else{
          res.json(productsearch);
        }
        
    });
});

router.get('/productdetail/:id',(req,res)=>
{       
    var id = req.params.id;
    console.log("Inside productdetail");
    Product.findById(id).lean().exec((err,product)=>{
        if(err) return handleError(err);
        res.json(product);
    });        
});

router.get('/bidding/',isLoggedIn,(req,res)=>{
    Bids.findOne({bidid : 1}).lean().exec((err,bid)=>{
        if(err) handleError (err);
        res.render('bidding/bidding',{
          bid
        });
    });
});

router.get('/status/:id',isLoggedIn,(req,res)=>{
    var id = req.params.id;
    Product.find({usertypeid : id},'productname description product_image status').lean().exec(
    function(err,product){
        if(err) return handleError(err);
        res.json(product);                           
    }); 

});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/users/login');
  }
}

module.exports = router;