import { addToCartController, deleteCartItemController, getCartItemsController, updateCartItemController } from "../controllers/cart.controller.js"
//import protect middleware to secure cart routes
import { protect } from "../middleware/authMiddleware.js"

//separate routes section for cart
const cartRoutes = (app) => {
    //use express app/server for routing http requests and handle logic in controller
    //post request to add to cart with protect middleware to secure route and controller to handle logic
    app.post('/cart', protect, addToCartController)
    //put request to update quantity using productid in param
    app.put('/cart/:productId', protect, updateCartItemController)
    //delete request to remove an item from cart
    app.delete('/cart/:productId', protect, deleteCartItemController)
    //get all cart items
    app.get('/cart', protect, getCartItemsController)
}

export default cartRoutes