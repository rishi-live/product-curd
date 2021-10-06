const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new mongoose.Schema(
    {
        category_name: {
            type: String,
        },
        status: {
            type: String,
        }
    },
    {
        timestamps: true,
        toObject: {
            transform: function (doc, ret, options) {              
              delete ret.__v;
              delete ret.status;
              return ret;
            }
          }
    }
);

module.exports = mongoose.model("product_category_master", productSchema, "product_category_master");