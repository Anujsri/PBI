var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var CustomerSchema = mongoose.Schema({
	name: {
		type: String,
		index:true,
		required: true,
	}, 
	email: {
		type: String,
		required: true,
		unique: true
	},
	username:
	{
		type:String,
		required: true,
		unique: true
	},
	phone: {
		type: Number,
		required: true,
	},
	address : {
		type : String,
		required : true
	},
	city : {
		type : String,
		required : true
	},
	state : {
		type : String,
		required : true
	},
	zip : {
		type : Number,
		required : true
	},
	complete : {
		type : Boolean,
		default: false
	},
	userid:{
		type:String,
		required: true
	}
});

var Customer = module.exports = mongoose.model('Customer', CustomerSchema);
	module.exports.createCustomer = (newCustomer, callback)=>{  
            newCustomer.save(callback);   
    }
	 
 

 

 

