import mongoose from "mongoose";
import Product from "../models/Product.models.js";
import Cart from "../models/Cart.models.js";
//add to cart controller
export const addToCartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body; //destructure productid and quantity
    //check if quantity is not 0 or less
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be greater than 0" });
    }
    if (isNaN(productId)) {
      //check if not a number
      //return bad request as response
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }
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
      id: "6a38897bcb31534ba9fd6c3e",
    };
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
    const existingItem = cart.items.find((item) =>
      item.product.equals(product._id),
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

//update cart items quantity
export const updateCartItemController = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;
    req.user = {
      id: "6a38897bcb31534ba9fd6c3e",
    }; //testing
    // if quantity is not more than 0 return error
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Quantity must be greater than 0" });
    }

    //if product id not valid wrt obect id return error
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Product ID" });
    }

    //get product to check stock
    const product = await Product.findById(productId);
    //check if quantity > stock
    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    //find cart item with productid and update quantity
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id, "items.product": productId },
      { $set: { "items.$.quantity": quantity } },
      { new: true },
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Item or Cart not found",
      });
    }
    //return success msg
    return res.status(200).json({
      success: true,
      message: "Cart updated",
      cart,
    });
  } catch (error) {
    //return error msg
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//remove an item from cart with productid from request param
export const deleteCartItemController = async (req, res) => {
  try {
    req.user = {
      id: "6a38897bcb31534ba9fd6c3e",
    }; //testing
    const { productId } = req.params;

    //product id validation
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Product ID" });
    }
    //update after finding item with given product id using pull
    const updatedCart = await Cart.findOneAndUpdate(
      {
        user: req.user.id,
        "items.product": productId,
      },
      {
        $pull: {
          items: {
            product: productId,
          },
        },
      },
      {
        new: true,
      },
    );

    //if not found return error
    if (!updatedCart) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }
    //else return updated cart successfully
    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart: updatedCart,
    });
  } catch (error) {
    //return error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all cart items controller for a user
export const getCartItemsController = async (req, res) => {
  try {
    req.user = {
      id: "6a38897bcb31534ba9fd6c3e",
    }; //testing
    //find cart for a user and populate product from product collection
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.product");

    //return empty cart items
    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: [],
        },
      });
    }

    //return cart successfully
    return res.status(200).json({
      success: true,
      count: cart.items.length,
      cart,
    });
  } catch (error) {
    //return error
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
