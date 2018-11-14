var mongoose = require('mongoose');
 

var ProductSchema = mongoose.Schema({
    productname: {
        type: String,
        index:true,
        required: true
    },
     
    quantity: {
        type: Number,
        required: true
    },
    status :
    {
        type :Boolean,
        default : false
    },
    price:
    {
        type: Number,
        required: true
    },
    usertypeid:{
        type :String,
        required: true
    },
    location :{
        type :String,
        required: true
    },
     
    category :{
        type: String,
        required: true
    },
    subcategory:{
        type:String,
        default: "None"
    },
    manufacturingdate:{
        type:Date,
        required: true
    },
    bestbefore:{
        type:Date,
        required: true
    },
    description:{
       type:String,
       required: true
    },
    city:{
        type : String,
        required: true
    },
    state : {
        type : String,
       required: true
    },
    zip: {
        type : Number,
        required: true
    },
    weight:{
        type: Number,
        required: true

    },
    certificateimage:{
        type : String
    },
    product_image:{
        type: String,
        default: "https://www.dahu.bio/images/photos/agriculture/organic-product.jpg" 
    }
});


var Product = module.exports = mongoose.model('Product', ProductSchema);


module.exports.createProduct = (newProduct, callback)=>{  
            newProduct.save(callback);   
}

 module.exports.getProductById = (id, callback)=>{
    Product.findById(id, callback);
}