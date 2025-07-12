

const mongoose = require('mongoose')

const galarySchema = new mongoose.Schema({
    files: [
        {
          filename: String,
          path: String,
        }
      ],
      uploadedAt: { 
        type: Date, 
        default: Date.now 
    }
})

const Galary = mongoose.model('galary',galarySchema)
module.exports = Galary