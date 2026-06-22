import { addToCartController, updateCartItemController } from "../controllers/cart.controller.js"

//separate routes section for cart
const cartRoutes = (app) => {
    //use express app/server for routing http requests and handle logic in controller
    //post request to add to cart
    app.post('/cart', addToCartController)
    app.put('/cart/:productId', updateCartItemController)

}

export default cartRoutes