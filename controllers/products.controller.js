import Product from "../models/Product.models.js" //import product model

//get allproducts controller which requests / queries mongodb for reading all data
export const getAllProductsController = async (req, res) => {
    //logic to get all data from DB
    try {
        const products = await Product.find() // query to get all data
        return res.status(200).json(products) //set response status as success and send json response
    } catch (err) {
        return res.status(500).json({message: err.message}) //send error response
    }
}