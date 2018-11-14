
var mongoose = require('mongoose');
var BidSchema = mongoose.Schema({ 
    bidstart : {
    	type : Boolean,
    	default : false
    },
    bidid : {
    	type : Number,
    	default : 1
    }
});

var Bids = module.exports = mongoose.model('Bids', BidSchema);
 