var mongoose = require('mongoose');

var ChatsSchema = mongoose.Schema({
    
    name : {
    	type : String,
    	index : true
    },
    message : {
    	type : String
    },
    location : {
    	type : String
    },
    manufacturing_date : {
    	type : Date
    },
    price : {
     	type : Number
    },
    product_name : {
     	type : String
    },
    username : {
        type : String
    }
});

var Chats = module.exports = mongoose.model('Chats', ChatsSchema);