const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId


const itemSchema = new mongoose.Schema({
    owner : {
       type: ObjectID,
       required: true,
       ref: 'User'
    },
    item_name: {
       type: String,
       required: true,
       trim: true
    },
    item_description: {
      type: String,
      required: true
    },
    item_category: {
       type: String,
       required: true
    },
    item_price: {
       type: Number,
       required: true
    }
}, {
timestamps: true
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item
