var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Manufacture Schema
var ManufactureSchema = mongoose.Schema({
	name: {
		type: String,
		index:true
	},
	 
	email: {
		type: String,
		required: true,
		 
	},
	status:{
         type:Boolean,
         default:false
	},

	phone: {
		type: Number,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	state:{
        type:String,
        required: true
	},
	zip:{
		type:Number,
		required: true
	},
	image:{
		type:String
	},
	 
	userid:{
		type:String,
		required: true
	},
	usertype:
	{
		type:String,
		required: true
	},
	date  :  
	{
	    type: Date, 
	    default: Date.now,
	    required: true
	},
	image_url:{
		type: String,
		default: "http://icons.iconarchive.com/icons/icons-land/vista-people/256/Person-Male-Light-icon.png"
	},
	subscribe : {
		type : Boolean,
		default : false
	} 
});

var Manufacture = module.exports = mongoose.model('Manufacture', ManufactureSchema);

module.exports.createManufacture = (newManufacture, callback)=>{
	bcrypt.genSalt(10, (err, salt) =>{
	    bcrypt.hash(newManufacture.password, salt,(err, hash) =>{
	        newManufacture.password = hash;
	        newManufacture.save(callback);
	    });
	});
}

 module.exports.getUserById = (id, callback)=>{
	Manufacture.findById(id, callback);
}

 

 