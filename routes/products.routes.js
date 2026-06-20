import { getAllProductsController } from "../controllers/products.controller.js"

//separate routes section for products
const productRoutes = (app) => {
    //use express app/server for routing http requests and handle logic in controller
    app.get('/products', getAllProductsController)
}

export default productRoutes