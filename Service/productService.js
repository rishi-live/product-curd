const Product = require("../database/models/productModel");
const ProductDetails = require("../database/models/productDetailsModel");
const mongoose = require("mongoose");

module.exports.insert = async (serviceData) => {
  try {
    let pdt_details = new Product({ ...serviceData });
    let result = await pdt_details.save();
    return result;
  } catch (error) {
    console.log("Something went wrong: Service: insert", error);
    throw new Error(error);
  }
};

module.exports.insertDetails = async (serviceData) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(serviceData.category_id)) {
      // throw new Error(`Invalid Id`);
      return false;
    } else {
      let pdt_details = new ProductDetails({ ...serviceData });
      let result = await pdt_details.save();
      return result;
    }
  } catch (error) {
    console.log("Something went wrong: Service: insertDetails", error);
    throw new Error(error);
  }
};
module.exports.update = async ({ id, updateInfo }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`Invalid Id`);
    }
    let pdt_update = await Product.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
      useFindAndModify: false,
    });
    if (!pdt_update) return false;

    return pdt_update;
  } catch (error) {
    console.log("Something went wrong: Service: update", error);
    throw new Error(error);
  }
};

module.exports.searchProduct = async ({
  id = "",
  category_name = "",
  skip = 0,
  limit = 0,
}) => {
  try {
    let match = {status: { $ne: "deleted" }};
    if (category_name) {
      match["category_name"] = eval("{ $regex: /" + category_name + "/i }");
    }
    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        // throw new Error(`Invalid Id`);
        return false;
      }
      match["_id"] = id;
    }
    let data = await Product.find(match)
      .sort({ _id: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    if (!data.length) return false;

    return data;
  } catch (error) {
    console.log("Something went wrong: Service: searchProduct", error);
    throw new Error(error);
  }
};

module.exports.delete = async ({ id }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`Invalid Id`);
    }
    // let pdt_delete = await Product.findByIdAndDelete(id);
    let pdt_delete = await Product.findOneAndUpdate(
      { _id: id },
      { status: "deleted" },
      { new: true, useFindAndModify: false }
    );
    if (!pdt_delete) return false;

    return pdt_delete;
  } catch (error) {
    console.log("Something went wrong: Service: delete", error);
    throw new Error(error);
  }
};

module.exports.searchProductInfo = async ({ category_name = "" }) => {
  try {
      let find = {status: { $ne: "deleted" }};
      if(category_name){
          find['category_name'] = eval("{ $regex: /" + category_name + "/i }")
      }
    let data = await Product.aggregate([
      { $match: find },
      {
        $lookup: {
          from: "product_details",
          as: "category_details",
          let: { category_id: "$_id" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$category_id", "$$category_id"] } },
            },
            { $sort: { _id: -1 } },
          ],
        },
      },
      { $sort: { "category_details.createdAt": -1 } },
      {
        $project: {
          "category_details.__v": 0,
          "category_details.category_id": 0,
          __v: 0,
        },
      },
    ]);

    if (!data.length) return false;

    return data;
  } catch (error) {
    console.log("Something went wrong: Service: searchProductInfo", error);
    throw new Error(error);
  }
};

