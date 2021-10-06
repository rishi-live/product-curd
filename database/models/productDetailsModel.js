const mongoose = require('mongoose');

const detail = new mongoose.Schema({
    product_name: {
        type: 'String',
        required: true
    },
    quantity: {
        type: 'String',
        required: true,
    },
    price: {
        type: 'Number',
        required: true
    },
    category_id: {
        type: 'ObjectId',
        required: true
    }
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret, options) {              
          delete ret.__v;
          return ret;
        }
      }
  });

module.exports = mongoose.model('product_details', detail,'product_details');