import Product from "../models/Product.models.js"; //import product model

//get allproducts controller which requests / queries mongodb for reading all data
export const getAllProductsController = async (req, res) => {
  //logic to get all data from DB
  try {
    const products = await Product.find(); // query to get all data
    return res.status(200).json(products); //set response status as success and send json response
  } catch (err) {
    return res.status(500).json({ message: err.message }); //send error response
  }
};

//get a single product by id
export const getProductByIdController = async (req, res) => {
  //logic to get a product
  try {
    const productId = req.params.id
    if (isNaN(productId)) {
      //check if not a number
      //return bad request as response
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }
    // query DB to find one with param id
    const product = await Product.findOne({ id: productId });

    //if product not present return not found message
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    //if found return product details
    return res.status(200).json({
      product,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message }); //send error response
  }
};
