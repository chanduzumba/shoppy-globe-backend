import { addToCartController, deleteCartItemController, updateCartItemController } from "../controllers/cart.controller.js"

//separate routes section for cart
const cartRoutes = (app) => {
    //use express app/server for routing http requests and handle logic in controller
    //post request to add to cart
    app.post('/cart', addToCartController)
    //put request to update quantity using productid in param
    app.put('/cart/:productId', updateCartItemController)
    //delete request to remove an item from cart
    app.delete('/cart/:productId', deleteCartItemController)

}

export default cartRoutes