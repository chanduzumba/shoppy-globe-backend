import Product from "../models/Product.models.js"; //import product model

//get allproducts controller which requests / queries mongodb for reading all data
export const getAllProductsController = async (req, res) => {
  //logic to get all data from DB
  try {
    const products = await Product.find(); // query to get all data
    return res.status(200).json({success: true, products}); //set response status as success and send json response
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message }); //send error response
  }
};

//get a single product by id
export const getProductByIdController = async (req, res) => {
  try {
    const productId = req.params.id;
    let product;

    //check product id or mongodb _id
    if (/^[0-9]+$/.test(productId)) {
      product = await Product.findOne({ id: Number(productId) });
    } else if (/^[0-9a-fA-F]{24}$/.test(productId)) {
      product = await Product.findById(productId);
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
