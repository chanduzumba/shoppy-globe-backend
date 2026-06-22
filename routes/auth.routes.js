import { registerController, loginController } from "../controllers/auth.controller.js"

//separate routes section for cart
const authRoutes = (app) => {
    //use express app/server for routing http requests and handle logic in controller
    //post request to add user
    app.post('/register', registerController)
    //login route
    app.post('/login', loginController)

}

export default authRoutes