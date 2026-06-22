import Product from "../models/Product.models.js";
import Cart from "../models/Cart.models.js";
//add to cart controller
export const addToCartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body; //destructure productid and quantity

    console.log("prod id", productId)
    //get product using id
    const product = await Product.findOne({ id: productId });

    //if product not found return 404
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    //if less than stock return 400/bad request saying insufficient stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    
    req.user = {
      id: "6a38897bcb31534ba9fd6c3e"
    }
    console.log(req.user.id)
    //else find cart for user
    let cart = await Cart.findOne({ user: req.user.id });

    //if not present create one for user with user id and empty items list
    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [],
      });
    }

    //if item present in cart - true or false
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    //if item present increment quantity
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock",
        });
      }

      existingItem.quantity = newQuantity;
    } else {
        //push item if all good add to cart
      cart.items.push({
        product: product._id,
        quantity,
      });
    }

    //save cart record
    await cart.save();

    //return success msg
    return res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    //return 500 if something is wrong
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};