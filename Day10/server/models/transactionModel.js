
const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    transactionId : {
        type : String,
        unique : true
    },
    accNumber : {
        type : String,
        ref : 'accDetails'
    },
    type : {
        type : String,
        enum: ['Deposit', 'Withdraw', 'Transfer'],
        require : true
    },
    amount : {
        type : Number,
        require : true
    },
    fromAcc : {
        type : String,
        default : "Current"
    },
    toAcc : {
        type : String,
        default : "Current"
    },
    status : {
        type : String,
        enum: ['Success', 'Failed', 'Pending'],
        default : "Success"
    },
    note : {
        type : String,
        defalt : "Thank You for using our bank"
    },
    timestamp : {
        type : Date,
        default : Date.now
    }
})

transactionSchema.pre('save', async function (next) {
    if (this.transactionId) return next();
  
    const count = await mongoose.model('transactionDetails').countDocuments({});
    const padded = String(count + 1).padStart(4, '0');
    const year = new Date().getFullYear();
  
    this.transactionId = `SBI${year}${padded}`;
    next();
  });

const transaction = mongoose.model('transactionDetails',transactionSchema)

module.exports = transaction