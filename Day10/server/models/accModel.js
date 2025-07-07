const mongoose  = require("mongoose");

const accSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userDetails'
    },
    accNumber : {
        type : String,
        unique : true,
    },
    accType : {
        type : String,
        default : "savings"
    },
    balance : {
        type : Number,
        default : 1000
    },
    ifscCode : {
        type : String,
        default : "XXYYZZ1020"
    },
    branchName : {
        type : String,
        default : "tenkasi"
    },
    isActive : {
        type : Boolean,
        default : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

accSchema.pre('save', async function (next) {
    if (this.accNumber) return next();
  
    const count = await mongoose.model('accDetails').countDocuments({});
    const padded = String(count + 1).padStart(4, '0');
    const year = new Date().getFullYear();
  
    this.accNumber = `SBI${year}${padded}`;
    next();
  });
  

const Acc = mongoose.model('accDetails',accSchema)

module.exports = Acc